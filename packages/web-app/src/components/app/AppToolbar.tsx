import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Brightness4 from '@material-ui/icons/Brightness4'
import Brightness7 from '@material-ui/icons/Brightness7'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuIcon from '@material-ui/icons/Menu'
import Settings from '@material-ui/icons/Settings'
import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../store/types'

// https://material-ui.com/components/material-icons/

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
}))

const APP_NAME = 'X2 React'

interface Props {
  drawerOpen: boolean
  setDrawerOpen: (s: boolean) => void
}

const AppToolbar: React.FC<Props> = ({ drawerOpen, setDrawerOpen }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const darkMode = useSelector((state: RootState) => state.darkMode)

  const setReduxState = (key: string, value: string | number | boolean) =>
    dispatch({ type: 'setReduxState', key, value })

  const saveSetting = (setting: string, value: string | boolean) => {
    setReduxState(setting, value)
    dispatch({ type: 'saveAppSettings' })
  }

  return (
    <Toolbar className={classes.toolbar}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        data-testid="open-drawer"
        onClick={() => setDrawerOpen(true)}
        className={clsx(
          classes.menuButton,
          drawerOpen && classes.menuButtonHidden
        )}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        {APP_NAME}
      </Typography>
      <Tooltip
        title="Toggle light/dark theme"
        aria-label="Toggle light/dark theme"
      >
        {darkMode ? (
          <IconButton
            color="inherit"
            data-testid="dark-mode"
            onClick={() => saveSetting('darkMode', false)}
          >
            <Brightness7 />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            data-testid="dark-mode"
            onClick={() => saveSetting('darkMode', true)}
          >
            <Brightness4 />
          </IconButton>
        )}
      </Tooltip>
      <Tooltip title="Settings" aria-label="Settings">
        <IconButton
          color="inherit"
          onClick={() => history.push('/AppSettingsView')}
        >
          <Settings />
        </IconButton>
      </Tooltip>
      <Tooltip title="X2 Home" aria-label="X2 Home">
        <IconButton color="inherit" onClick={() => history.push('/')}>
          <DashboardIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

export default AppToolbar
