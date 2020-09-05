import {
  emailListPageLength,
  selectEmail,
  selectEmailListPage,
  selectEmailLoading,
  getEmailAsync,
  selectEmailTotal,
  setEmailListPage,
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
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: { minWidth: 350 },
}))

export default function SearchView() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const emailsLoading = useSelector(selectEmailLoading)
  const emails = useSelector(selectEmail)
  const totalEmails = useSelector(selectEmailTotal)
  const emailListPage = useSelector(selectEmailListPage)

  const hasMore = () => (emailListPage + 1) * emailListPageLength < totalEmails

  const observer: any = useRef()
  const lastRowRef = useCallback(
    (node) => {
      if (emailsLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore()) {
          dispatch(setEmailListPage(emailListPage + 1))
          getEmailAsync(true)
        }
      })
      if (node) observer.current.observe(node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [emailsLoading]
  )

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer component={Paper}>
          {emailsLoading && <LinearProgress />}
          {emails && (
            <Table
              className={classes.table}
              size="small"
              aria-label="email"
              data-testid="search-results-table"
            >
              <EmailTableHead />
              <TableBody>
                {emails.map((email: any, index: any) => {
                  if (emails.length === index + 1) {
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
