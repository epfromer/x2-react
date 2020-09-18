import {
  getImportStatus,
  ImportLogEntry,
  selectImportLog,
  stopImportStatusInterval,
} from '@klonzo/common'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%', marginTop: theme.spacing(2) },
  paper: { width: '100%', marginBottom: theme.spacing(2), maxHeight: 400 },
  table: { minWidth: 350 },
  button: { margin: 15 },
}))

export default function ImportLog() {
  const log = useSelector(selectImportLog)
  const classes = useStyles()

  useEffect(() => stopImportStatusInterval, [])

  getImportStatus()

  const startImport = () => {
    // TODO status that server is importing, disable this fn if so
    const server = process.env.REACT_APP_X2_SERVER
    fetch(`${server}/importpst/`).catch((err) =>
      console.error('startImport: ', err)
    )
  }

  return (
    <div className={classes.root}>
      <Paper>
        <Button
          variant="contained"
          className={classes.button}
          onClick={startImport}
        >
          Import Email
        </Button>
        <TableContainer component={Paper} className={classes.paper}>
          <Table size="small" aria-label="import-log">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Import Log</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {log?.map((logEntry: ImportLogEntry) => {
                return (
                  <TableRow hover key={logEntry.id}>
                    <TableCell>{logEntry.timestamp}</TableCell>
                    <TableCell>{logEntry.entry}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}
