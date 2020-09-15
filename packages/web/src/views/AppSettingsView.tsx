import { emailServer } from '@klonzo/common'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import CustodianSettings from '../components/CustodianSettings'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: { minWidth: 350 },
}))

export default function AppSettingsView() {
  const [importing, setImporting] = useState(false)
  const [log, setLog] = useState(['one', 'two', 'three'])
  const classes = useStyles()

  const importPSTs = () => {
    setImporting(true)
    const url = `${emailServer}/importpst/`
    console.log(url)
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setLog(json))
      .catch((err) => console.error('fetch error', err))
      .then(() => setImporting(false))
  }

  const ImportLog = () => {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            {log.map((entry) => {
              return (
                <TableRow hover>
                  <TableCell style={{ padding: 0 }}>{entry}</TableCell>
                </TableRow>
              )
            })}
          </TableContainer>
        </Paper>
      </div>
    )
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <ImportLog />
      <CustodianSettings />
      <button hidden data-testid="save-setting"></button>
    </div>
  )
}
