import {
  importLoc,
  ImportLogEntry,
  selectImportLog,
  setImportLog,
  store,
  x2Server,
} from '@klonzo/common'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { gql, request } from 'graphql-request'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    overflow: 'auto',
    maxHeight: 300,
  },
  button: { margin: 15 },
}))

export default function ImportLog() {
  const log = useSelector(selectImportLog)
  const classes = useStyles()
  const [lastRow, setLastRow] = useState<HTMLDivElement | undefined | null>()
  let importTimer: number | undefined

  const getImportStatusInterval = () => {
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const query = gql`
      {
        getImportStatus {
          id
          timestamp
          entry
        }
      }
    `
    request(`${server}/graphql/`, query)
      .then((data) => store.dispatch(setImportLog(data.getImportStatus)))
      .catch((err) => console.error('getImportStatusInterval: ', err))
  }

  const startImport = () => {
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const mutation = gql`
      mutation importPST($loc: String) {
        importPST(loc: $loc)
      }
    `
    request(`${server}/graphql/`, mutation, { loc: importLoc })
  }

  const stopImportStatusInterval = (): void => {
    if (!importTimer) return
    clearInterval(importTimer)
    importTimer = undefined
  }

  if (!importTimer) importTimer = setInterval(getImportStatusInterval, 2000)

  useEffect(() => stopImportStatusInterval)

  useEffect(() => lastRow?.scrollIntoView({ behavior: 'smooth' }))

  return (
    <Paper>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={startImport}
      >
        Import Email
      </Button>
      <List dense className={classes.root} aria-label="import-log">
        {log?.map((logEntry: ImportLogEntry) => {
          return (
            <ListItem key={logEntry.id} alignItems="flex-start">
              <ListItemText
                primary={logEntry.timestamp + ' ' + logEntry.entry}
              />
            </ListItem>
          )
        })}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => setLastRow(el)}
        ></div>
      </List>
    </Paper>
  )
}
