import { importLoc, x2Server } from '@klonzo/common'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { gql, request } from 'graphql-request'
import React, { useEffect, useRef, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    overflow: 'auto',
    maxHeight: 300,
  },
  button: { margin: 15 },
  text: { marginLeft: 15, paddingBottom: 15 },
}))

interface ImportLogEntry {
  id: string
  timestamp: string
  entry: string
}

export default function ImportLog() {
  const classes = useStyles()
  const lastRowRef = useRef(null)
  let importInterval: number | undefined
  const [log, setLog] = useState([])
  const [scrollIntoView, setScrollIntoView] = useState(true)

  const getImportStatus = () => {
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
      .then((data) => setLog(data.getImportStatus))
      .catch((e) => console.error(e))
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
    if (!importInterval) return
    clearInterval(importInterval)
    importInterval = undefined
  }

  if (!importInterval) importInterval = setInterval(getImportStatus, 2000)

  const setScroll = (e: any) => {
    setScrollIntoView(e.target.checked)
  }

  useEffect(() => stopImportStatusInterval)

  useEffect(() => {
    if (lastRowRef && lastRowRef.current && log.length && scrollIntoView) {
      // @ts-ignore
      lastRowRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  })

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
      <FormControlLabel
        control={<Checkbox checked={scrollIntoView} onChange={setScroll} />}
        label="Auto-scroll to latest entries"
      />
      {log.length === 0 && <div className={classes.text}>No log entries</div>}
      {log.length !== 0 && (
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
          <div style={{ float: 'left', clear: 'both' }} ref={lastRowRef}></div>
        </List>
      )}
    </Paper>
  )
}
