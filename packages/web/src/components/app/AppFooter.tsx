import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  bottomBar: { top: 'auto', bottom: 0 },
}))

export default function AppFooter() {
  const classes = useStyles()

  return (
    <AppBar position="fixed" color="primary" className={classes.bottomBar}>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          Klonzo &copy; 2020
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
