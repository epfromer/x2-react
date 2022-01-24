import { Auth0Provider } from '@auth0/auth0-react'
import AdapterDateFns from '@date-io/date-fns'
import {
  getDarkMode,
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  store,
} from '@klonzo/common'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
  AppBar,
  Container,
  createTheme,
  PaletteMode,
  ThemeProvider,
} from '@mui/material'
import { green, grey } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import './App.css'
import AppDrawer from './components/app/AppDrawer'
import AppToolbar from './components/app/AppToolbar'
import AppRouting from './router/AppRouting'

const useStyles = makeStyles({
  root: { display: 'flex' },
  appBarSpacer: { height: 70 },
  content: { flexGrow: 1, height: '98vh', overflow: 'auto' },
  container: { paddingTop: 1, paddingBottom: 4 },
})

getInitialDataAsync(store)
getEmailAsync(store)
loadAppSettingsAsync(store)

const CoreApp = () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <AppToolbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </AppBar>
      <AppDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <AppRouting />
        </Container>
      </main>
    </div>
  )
}

const WithAuth0 = () => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const navigate = useNavigate()

  return (
    <Auth0Provider
      domain={domain as string}
      clientId={clientId as string}
      redirectUri={window.location.origin}
      onRedirectCallback={() => navigate('/AppSettingsView')}
    >
      <CoreApp />
    </Auth0Provider>
  )
}

const WithLocalization = () => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <WithAuth0 />
  </LocalizationProvider>
)

const WithRouter = () => (
  <Router>
    <WithLocalization />
  </Router>
)

function getTheme(mode: PaletteMode) {
  const lightPalette = {
    // palette values for light mode
    primary: green,
    divider: green[200],
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  }
  const darkPalette = {
    // palette values for dark mode
    primary: green,
    divider: green[700],
    background: {
      default: grey[900],
      paper: green[800],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
  }

  return {
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette),
    },
  }
}

const WithTheme = () => {
  const customTheme = createTheme(
    getTheme(useSelector(getDarkMode) ? 'dark' : 'light')
  )
  return (
    <ThemeProvider theme={customTheme}>
      <WithRouter />
    </ThemeProvider>
  )
}

const WithRedux = () => (
  <Provider store={store}>
    <WithTheme />
  </Provider>
)

export default function App() {
  return <WithRedux />
}
