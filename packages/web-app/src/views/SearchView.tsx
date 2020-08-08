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
import { RootState } from '../store/types'
import { fetchAndCache } from './../store/actions'

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
  const classes = useStyles()
  const dispatch = useDispatch()
  const emailsLoading = useSelector((state: RootState) => state.emailsLoading)
  const emails = useSelector((state: RootState) => state.emails)
  const totalEmails = useSelector((state: RootState) => state.totalEmails)
  const emailListPage = useSelector((state: RootState) => state.emailListPage)
  const emailListItemsPerPage = useSelector(
    (state: RootState) => state.emailListItemsPerPage
  )

  const hasMore = () =>
    (emailListPage + 1) * emailListItemsPerPage < totalEmails

  const observer: any = useRef()
  const lastRowRef = useCallback(
    (node) => {
      if (emailsLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore()) {
          dispatch({
            type: 'setReduxState',
            key: 'emailListPage',
            value: emailListPage + 1,
          })
          fetchAndCache('emails', false, true)
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
                {emails.map((email, index) => {
                  if (emails.length === index + 1) {
                    return (
                      <ExpandingRow
                        lastRowRef={lastRowRef}
                        key={email._id}
                        email={email}
                      />
                    )
                  } else {
                    return <ExpandingRow key={email._id} email={email} />
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
