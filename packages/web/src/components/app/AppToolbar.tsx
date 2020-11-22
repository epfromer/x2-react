import { getDarkMode, setDarkModeAsync, store } from '@klonzo/common'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Brightness4 from '@material-ui/icons/Brightness4'
import Brightness7 from '@material-ui/icons/Brightness7'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import clsx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SettingsButton from './SettingsButton'

// https://material-ui.com/components/material-icons/

const useStyles = makeStyles(() => ({
  toolbar: { paddingRight: 24 },
  title: { flexGrow: 1 },
  menuButton: { marginRight: 36 },
  menuButtonHidden: { display: 'none' },
}))

const APP_NAME = 'x2 React'

interface Props {
  drawerOpen: boolean
  setDrawerOpen: (s: boolean) => void
}
export default function AppToolbar({ drawerOpen, setDrawerOpen }: Props) {
  const classes = useStyles()
  const history = useHistory()
  const darkMode = useSelector(getDarkMode)

  return (
    <Toolbar className={classes.toolbar}>
      <Tooltip title="Open drawer" aria-label="Open drawer">
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
      </Tooltip>
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
            onClick={() => setDarkModeAsync(store, false)}
          >
            <Brightness7 />
          </IconButton>
        ) : (
            <IconButton
              color="inherit"
              data-testid="dark-mode"
              onClick={() => setDarkModeAsync(store, true)}
            >
              <Brightness4 />
            </IconButton>
          )}
      </Tooltip>
      <SettingsButton />
      <Tooltip title="Search" aria-label="Search">
        <IconButton color="inherit" onClick={() => history.push('/SearchView')}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="x2 Home" aria-label="x2 Home">
        <IconButton color="inherit" onClick={() => history.push('/')}>
          <HomeIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}
