import {
  Brightness4,
  Brightness7,
  Home,
  Menu,
  Search,
} from '@mui/icons-material'
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getDarkMode, setDarkModeAsync, store } from '../../common'
import SettingsButton from './SettingsButton'

// https://material-ui.com/components/material-icons/

const APP_NAME = 'x2 React'

interface Props {
  drawerOpen: boolean
  setDrawerOpen: (s: boolean) => void
}
export default function AppToolbar({ drawerOpen, setDrawerOpen }: Props) {
  const navigate = useNavigate()
  const darkMode = useSelector(getDarkMode)

  return (
    <Toolbar>
      <Tooltip title="Open drawer" aria-label="Open drawer">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          data-testid="open-drawer"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu />
        </IconButton>
      </Tooltip>
      <Typography component="h1" variant="h6" color="inherit" noWrap>
        {APP_NAME}
      </Typography>
      <Box sx={{ flexGrow: 1 }}></Box>
      {darkMode && (
        <Tooltip
          title="Toggle light/dark theme"
          aria-label="Toggle light/dark theme"
        >
          <IconButton
            color="inherit"
            data-testid="dark-mode"
            onClick={() => setDarkModeAsync(store, false)}
          >
            <Brightness7 />
          </IconButton>
        </Tooltip>
      )}
      {!darkMode && (
        <Tooltip
          title="Toggle light / dark theme"
          aria-label="Toggle light / dark theme"
        >
          <IconButton
            color="inherit"
            data-testid="dark-mode"
            onClick={() => setDarkModeAsync(store, true)}
          >
            <Brightness4 />
          </IconButton>
        </Tooltip>
      )}
      <SettingsButton />
      <Tooltip title="Search" aria-label="Search">
        <IconButton color="inherit" onClick={() => navigate('/SearchView')}>
          <Search />
        </IconButton>
      </Tooltip>
      <Tooltip title="x2 Home" aria-label="x2 Home">
        <IconButton color="inherit" onClick={() => navigate('/')}>
          <Home />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}
