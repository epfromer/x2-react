import {
  getImportStatus,
  ImportLogEntry,
  selectImportLog,
  stopImportStatusInterval,
} from '@klonzo/common'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CustodianSettings from '../components/CustodianSettings'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: { minWidth: 350 },
}))

console.log('app settings')

export default function AppSettingsView() {
  const log = useSelector(selectImportLog)
  const classes = useStyles()

  getImportStatus()

  const ImportLog = () => {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="import-log">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Entry</TableCell>
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

  useEffect(() => stopImportStatusInterval, [])

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
