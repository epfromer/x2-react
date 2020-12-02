import { Auth0Provider } from '@auth0/auth0-react'
import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  getDarkMode,
  getThemeName,
  store,
} from '@klonzo/common'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import './App.css'
import AppDrawer from './components/app/AppDrawer'
import AppToolbar from './components/app/AppToolbar'
import { getTheme } from './utils/appThemes'
import RouteSwitch from './router/RouteSwitch'

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' },
  appBarSpacer: theme.mixins.toolbar,
  content: { flexGrow: 1, height: '98vh', overflow: 'auto' },
  container: { paddingTop: theme.spacing(1), paddingBottom: theme.spacing(4) },
}))

getInitialDataAsync(store)
getEmailAsync(store)
// TODO - getApp...
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
          <RouteSwitch />
        </Container>
      </main>
    </div>
  )
}

const WithAuth0 = () => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const history = useHistory()

  return (
    <Auth0Provider
      domain={domain as string}
      clientId={clientId as string}
      redirectUri={window.location.origin}
      onRedirectCallback={() => history.push('/AppSettingsView')}
    >
      <CoreApp />
    </Auth0Provider>
  )
}

const WithRouter = () => (
  <Router>
    <WithAuth0 />
  </Router>
)

const WithTheme = () => {
  const darkMode = useSelector(getDarkMode)
  const palette: any = getTheme(useSelector(getThemeName))
  palette.type = darkMode ? 'dark' : 'light'
  const customTheme = createMuiTheme({ palette })
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
