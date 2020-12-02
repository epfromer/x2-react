import {
  defaultLimit,
  getEmail,
  getEmailListPage,
  getEmailLoading,
  getEmailAsync,
  getEmailTotal,
  setEmailListPage,
  store,
} from '@klonzo/common'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmailTableHead from '../components/emaillist/EmailTableHead'
import ExpandingRow from '../components/emaillist/ExpandingRow'

// https://github.com/WebDevSimplified/React-Infinite-Scrolling

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  paper: { width: '100%', marginBottom: theme.spacing(2) },
  table: { minWidth: 350 },
}))

export default function SearchView() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const emailLoading = useSelector(getEmailLoading)
  const email = useSelector(getEmail)
  const emailTotal = useSelector(getEmailTotal)
  const emailListPage = useSelector(getEmailListPage)

  const hasMore = () => (emailListPage + 1) * defaultLimit < emailTotal

  const observer: any = useRef()
  const lastRowRef = useCallback(
    (node) => {
      if (emailLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore()) {
          dispatch(setEmailListPage(emailListPage + 1))
          getEmailAsync(store, true)
        }
      })
      if (node) observer.current.observe(node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [emailLoading]
  )

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer component={Paper}>
          {emailLoading && <LinearProgress />}
          {email && (
            <Table
              className={classes.table}
              size="small"
              aria-label="email"
              data-testid="search-results-table"
            >
              <EmailTableHead />
              <TableBody>
                {email.map((email: any, index: any) => {
                  if (email.length === index + 1) {
                    return (
                      <ExpandingRow
                        lastRowRef={lastRowRef}
                        key={email.id}
                        email={email}
                      />
                    )
                  } else {
                    return <ExpandingRow key={email.id} email={email} />
                  }
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>
    </div>
  )
}
