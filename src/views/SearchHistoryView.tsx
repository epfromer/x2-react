import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { gql, request } from 'graphql-request'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from '../common'
import LoadingIndicator from '../components/LoadingIndicator'

export default function SearchHistoryView() {
  const navigate = useNavigate()
  const [log, setLog] = useState([])
  const [logLoading, setLogLoading] = useState(false)

  const getSearchHistory = (): void => {
    setLogLoading(true)
    const query = gql`
      {
        getSearchHistory {
          id
          timestamp
          entry
        }
      }
    `
    request(`${process.env.REACT_APP_X2_SERVER}/graphql/`, query)
      .then((data: any) => {
        setLog(data.getSearchHistory)
        setLogLoading(false)
      })
      .catch((e) => console.error(e))
  }

  const onSearchHistory = (row: any) => {
    const o = JSON.parse(row.row.entry)
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
    navigate('/SearchView')
  }

  const onClearHistory = () => {
    const mutation = gql`
      mutation {
        clearSearchHistory
      }
    `
    request(`${process.env.REACT_APP_X2_SERVER}/graphql/`, mutation)
      .then(() => getSearchHistory())
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    getSearchHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    { field: 'id', hide: true },
    { field: 'timestamp', headerName: 'Date', width: 250 },
    { field: 'entry', headerName: 'Search', width: 600 },
  ]

  return (
    <Box>
      {logLoading && <LoadingIndicator />}
      <Button
        variant="contained"
        color="primary"
        onClick={onClearHistory}
        data-testid="clear-history"
      >
        Clear History
      </Button>
      {!log.length && <Box sx={{ marginTop: 2 }}>No log entries</Box>}
      {log.length !== 0 && (
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid onRowClick={onSearchHistory} rows={log} columns={columns} />
        </Box>
      )}
    </Box>
  )
}
