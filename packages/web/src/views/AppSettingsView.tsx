import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import CustodianSettings from '../components/CustodianSettings'
import ImportLog from '../components/ImportLog'
import ThemePicker from '../components/ThemePicker'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(() => ({
  header: {
    marginTop: 15,
  },
}))

export default function AppSettingsView() {
  const classes = useStyles()
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} >
          <Typography variant="h5" className={classes.header} gutterBottom>
            App Theme
          </Typography>
          <ThemePicker />
        </Grid>
        <Grid item xs={12} sm={9} >
          <Typography variant="h5" className={classes.header} gutterBottom>
            Custodian Colors
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
