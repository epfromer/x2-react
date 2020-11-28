import {
  clearSearch,
  getEmailAsync,
  setAllText,
  setBody,
  setFrom,
  setOrder,
  setSent,
  setSort,
  setSubject,
  setTo,
  store,
  x2Server,
} from '@klonzo/common'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { ColDef, DataGrid, RowParams } from '@material-ui/data-grid'
import { gql, request } from 'graphql-request'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%', marginTop: theme.spacing(2) },
  table: { height: 500, width: '100%' },
  button: { margin: 15 },
  text: { padding: 15 },
}))

export default function SearchHistoryView() {
  const history = useHistory()
  const classes = useStyles()
  const [log, setLog] = useState([])
  const [logLoading, setLogLoading] = useState(false)

  const getSearchHistory = (): void => {
    setLogLoading(true)
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const query = gql`
      {
        getSearchHistory {
          id
          timestamp
          entry
        }
      }
    `
    request(`${server}/graphql/`, query)
      .then((data) => {
        setLog(data.getSearchHistory)
        setLogLoading(false)
      })
      .catch((e) => console.error(e))
  }

  const onSearchHistory = (row: RowParams) => {
    const o = JSON.parse(row.data.entry)
    store.dispatch(clearSearch())
    if (o.hasOwnProperty('sort')) store.dispatch(setSort(o.sort))
    if (o.hasOwnProperty('order')) store.dispatch(setOrder(o.order))
    if (o.hasOwnProperty('sent')) store.dispatch(setSent(o.sent))
    if (o.hasOwnProperty('from')) store.dispatch(setFrom(o.from))
    if (o.hasOwnProperty('to')) store.dispatch(setTo(o.to))
    if (o.hasOwnProperty('subject')) store.dispatch(setSubject(o.subject))
    if (o.hasOwnProperty('allText')) store.dispatch(setAllText(o.allText))
    if (o.hasOwnProperty('body')) store.dispatch(setBody(o.body))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  const onClearHistory = () => {
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const mutation = gql`
      mutation {
        clearSearchHistory
      }
    `
    request(`${server}/graphql/`, mutation)
      .then(() => getSearchHistory())
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    getSearchHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'timestamp', headerName: 'Date', width: 250 },
    { field: 'entry', headerName: 'Search', width: 600 },
  ]

  return (
    <div className={classes.root}>
      <Paper>
        {logLoading && <LoadingIndicator />}
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={onClearHistory}
          data-testid="clear-history"
        >
          Clear History
        </Button>
        {!log.length && <div className={classes.text}>No log entries.</div>}
        {log.length !== 0 && (
          <div className={classes.table}>
            <DataGrid
              autoPageSize
              onRowClick={onSearchHistory}
              rows={log}
              columns={columns}
            />
          </div>
        )}
      </Paper>
    </div>
  )
}
