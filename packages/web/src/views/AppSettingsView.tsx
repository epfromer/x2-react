import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import CustodianSettings from '../components/CustodianSettings'
import ImportLog from '../components/ImportLog'

const useStyles = makeStyles({
  header: { marginTop: 15 },
})

export default function AppSettingsView() {
  const classes = useStyles()

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Typography variant="h5" className={classes.header} gutterBottom>
            Custodians
          </Typography>
          <CustodianSettings />
        </Grid>
      </Grid>
      <Typography variant="h5" className={classes.header} gutterBottom>
        Import Log
      </Typography>
      <ImportLog />
    </div>
  )
}
