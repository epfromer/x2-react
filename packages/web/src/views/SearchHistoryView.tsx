import {
  getEmailAsync,
  getSearchHistoryAsync,
  searchHistoryExecute,
  selectSearchHistory,
  selectSearchHistoryLoading,
  x2Server,
} from '@klonzo/common'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { ColDef, DataGrid, RowParams } from '@material-ui/data-grid'
import { gql, request } from 'graphql-request'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%', marginTop: theme.spacing(2) },
  table: { height: 500, width: '100%' },
  button: { margin: 15 },
  text: { padding: 15 },
}))

export default function SearchHistoryView() {
  const searchHistory = useSelector(selectSearchHistory)
  const searchHistoryLoading = useSelector(selectSearchHistoryLoading)
  const history = useHistory()
  const classes = useStyles()

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
      .then(() => getSearchHistoryAsync())
      .catch((error) => console.error('CustodianSettings', error))
  }

  const onSearchHistory = (row: RowParams) => {
    searchHistoryExecute(row.data.entry)
    getEmailAsync()
    history.push('/SearchView')
  }

  const columns: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'timestamp', headerName: 'Date', width: 250 },
    { field: 'entry', headerName: 'Search', width: 600 },
  ]

  return (
    <div className={classes.root}>
      <Paper>
        {searchHistoryLoading && <LinearProgress />}
        <Button
          variant="contained"
          className={classes.button}
          onClick={onClearHistory}
          data-testid="clear-history"
        >
          Clear History
        </Button>
        {!searchHistory && (
          <div className={classes.text}>No searches found.</div>
        )}
        {searchHistory && (
          <div className={classes.table}>
            <DataGrid
              autoPageSize
              onRowClick={onSearchHistory}
              rows={searchHistory}
              columns={columns}
            />
          </div>
        )}
      </Paper>
    </div>
  )
}
