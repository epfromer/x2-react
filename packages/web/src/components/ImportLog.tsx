import { importLoc, x2Server } from '@klonzo/common'
import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { gql, request } from 'graphql-request'
import { Fragment, useEffect, useRef, useState } from 'react'

interface ImportLogEntry {
  id: string
  timestamp: string
  entry: string
}

export default function ImportLog() {
  const lastRowRef = useRef(null)
  let importInterval: number | undefined | NodeJS.Timer
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
    clearInterval(importInterval as number)
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
    <Fragment>
      <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 2 }}>
        Import Log
      </Typography>
      <Button variant="contained" color="primary" onClick={startImport}>
        Import Email
      </Button>
      <FormControlLabel
        control={
          <Checkbox
            checked={scrollIntoView}
            sx={{ marginLeft: 2 }}
            onChange={setScroll}
          />
        }
        label="Auto-scroll to latest entries"
      />
      {log.length === 0 && <Box sx={{ marginTop: 2 }}>No log entries</Box>}
      {log.length !== 0 && (
        <List
          dense
          sx={{ width: '100%', marginTop: 2, overflow: 'auto', maxHeight: 300 }}
          aria-label="import-log"
        >
          {log?.map((logEntry: ImportLogEntry) => {
            return (
              <ListItem key={logEntry.id} alignItems="flex-start">
                <ListItemText
                  primary={logEntry.timestamp + ' ' + logEntry.entry}
                />
              </ListItem>
            )
          })}
          <Box sx={{ float: 'left', clear: 'both' }} ref={lastRowRef} />
        </List>
      )}
    </Fragment>
  )
}
