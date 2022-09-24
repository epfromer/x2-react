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
  const [log, setLog] = useState([])
  const [scrollIntoView, setScrollIntoView] = useState(true)

  const getImportStatus = () => {
    if (!process.env.REACT_APP_X2_SERVER) {
      console.error('REACT_APP_X2_SERVER undefined')
      return
    }
    const query = gql`
      {
        getImportStatus {
          id
          timestamp
          entry
        }
      }
    `
    request(`${process.env.REACT_APP_X2_SERVER}/graphql/`, query)
      .then((data) => setLog(data.getImportStatus))
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getImportStatus()
      if (lastRowRef && lastRowRef.current && log.length && scrollIntoView) {
        // @ts-ignore
        lastRowRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 1000 * 2)
    return () => clearInterval(interval)
  })

  const startImport = () => {
    if (!process.env.REACT_APP_X2_SERVER || !process.env.REACT_APP_X2_PST_LOC) {
      console.error('REACT_APP_X2_SERVER or REACT_APP_X2_PST_LOC undefined')
      return
    }
    const mutation = gql`
      mutation importPST($loc: String) {
        importPST(loc: $loc)
      }
    `
    request(`${process.env.REACT_APP_X2_SERVER}/graphql/`, mutation, {
      loc: process.env.REACT_APP_X2_PST_LOC,
    })
  }

  const setScroll = (e: any) => {
    setScrollIntoView(e.target.checked)
  }

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
