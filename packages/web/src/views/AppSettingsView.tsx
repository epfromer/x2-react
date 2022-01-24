import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import CustodianSettings from '../components/CustodianSettings'
import ImportLog from '../components/ImportLog'
import ThemePicker from '../components/ThemePicker'

const useStyles = makeStyles({
  header: { marginTop: 15 },
})

export default function AppSettingsView() {
  const classes = useStyles()

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={2}>
          <Typography variant="h5" className={classes.header} gutterBottom>
            Theme
          </Typography>
          <ThemePicker />
        </Grid>
        <Grid item sm={10}>
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
