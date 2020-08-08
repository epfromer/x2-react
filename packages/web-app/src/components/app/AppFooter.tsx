import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
  },
}))

const AppFooter: React.FC = () => {
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

export default AppFooter
