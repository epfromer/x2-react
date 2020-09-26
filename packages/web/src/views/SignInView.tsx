import { setAuthenticated } from '@klonzo/common/src'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const authenticate = () => {
    const isAuthenticated = username === 'foo' && password === 'foo'
    if (isAuthenticated) {
      dispatch(setAuthenticated(true))
      history.push('/AppSettingsView')
    } else {
      // Incorrect username or password.
    }
  }

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
            autoFocus
            label="Username or email address"
            variant="filled"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={classes.input}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.input}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={authenticate}
            disabled={username === '' || password === ''}
          >
            Sign In
          </Button>
        </div>
      </Paper>
    </div>
  )
}
