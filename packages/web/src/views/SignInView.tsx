import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    padding: 10,
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
}))

export default function SignInView() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.input}>
          <Typography gutterBottom variant="h5" component="h2">
            Sign in to x2
          </Typography>
        </div>
        <div className={classes.input}>
          <TextField
            fullWidth
            id="filled-password-input"
            label="Username or email address"
            variant="filled"
          />
        </div>
        <div className={classes.input}>
          <TextField
            fullWidth
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
          />
        </div>
        <div className={classes.input}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => console.log('foo')}
            data-testid="clear-date-picker"
            color="primary"
          >
            Sign In
          </Button>
        </div>
      </Paper>
    </div>
  )
}
