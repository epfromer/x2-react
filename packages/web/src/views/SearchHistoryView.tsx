import { getSearchHistoryAsync, selectSearchHistory } from '@klonzo/common'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%', marginTop: theme.spacing(2) },
  paper: { width: '100%', marginBottom: theme.spacing(2), maxHeight: 400 },
  table: { minWidth: 350 },
  button: { margin: 15 },
}))

getSearchHistoryAsync()

export default function SearchHistoryView() {
  const log = useSelector(selectSearchHistory)
  console.log(log)

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Search History
      </Typography>
      <button hidden data-testid="save-setting"></button>
    </div>
  )
}
