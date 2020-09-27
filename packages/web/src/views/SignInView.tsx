import { authenticate } from '@klonzo/common/src'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ClearIcon from '@material-ui/icons/Clear'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import React, { useState } from 'react'
import Gravatar from 'react-gravatar'
import { useHistory } from 'react-router-dom'
import MUIGravatar from '../components/MUIGravatar'

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
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authFailAlert, setAuthFailAlert] = useState(false)

  const doAuthenticate = () => {
    if (authenticate(username, password)) {
      history.push('/AppSettingsView')
    } else {
      setAuthFailAlert(true)
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
          <MUIGravatar email="epfromer@gmail.com" />
        </div>
        <div className={classes.input}>
          <Gravatar email="epfromer@gmail.com" />
        </div>
        <div className={classes.input}>
          <Avatar src="http://www.gravatar.com/avatar/b6616eb062441e6e632de6a9248b8578?d=retro&r=g&s=50" />
        </div>
        <div className={classes.input}>
          <Avatar src="/x2.png" />
        </div>
        <div className={classes.input}>
          <Collapse in={authFailAlert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setAuthFailAlert(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Incorrect username or password.
            </Alert>
          </Collapse>
        </div>
        <div className={classes.input}>
          <TextField
            fullWidth
            autoFocus
            value={username}
            label="Username or email address"
            variant="filled"
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setUsername('')}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </div>
        <div className={classes.input}>
          <TextField
            fullWidth
            value={password}
            label="Password"
            type="password"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setPassword('')}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </div>
        <div className={classes.input}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={doAuthenticate}
            disabled={username === '' || password === ''}
          >
            Sign In
          </Button>
        </div>
      </Paper>
    </div>
  )
}
