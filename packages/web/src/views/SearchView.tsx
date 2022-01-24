import {
  defaultLimit,
  getEmail,
  getEmailAsync,
  getEmailListPage,
  getEmailLoading,
  getEmailTotal,
  setEmailListPage,
  store,
} from '@klonzo/common'
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmailTableHead from '../components/emaillist/EmailTableHead'
import ExpandingRow from '../components/emaillist/ExpandingRow'

// https://github.com/WebDevSimplified/React-Infinite-Scrolling

const useStyles = makeStyles({
  root: { width: '100%' },
  paper: { width: '100%', marginBottom: 2 },
  table: { minWidth: 350 },
})

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
