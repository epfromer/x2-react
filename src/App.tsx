import { Auth0Provider } from '@auth0/auth0-react'
import AdapterDateFns from '@date-io/date-fns'
import {
  getDarkMode,
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  store,
} from './common'
import {
  AppBar,
  Container,
  createTheme,
  Slide,
  ThemeProvider,
  Toolbar,
  useScrollTrigger,
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/system'
import { LocalizationProvider } from '@mui/x-date-pickers'
import React, { Fragment } from 'react'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import './App.css'
// import AppDrawer from '../../../src/components/app/AppDrawer'
// import AppToolbar from '../../../src/components/app/AppToolbar'
import ChartJSInit from './components/ChartJS'
// import AppRouting from '../../../src/router/AppRouting'
// import getTheme from '../../../src/utils/appThemes'

ChartJSInit()

getInitialDataAsync(store)
getEmailAsync(store)
loadAppSettingsAsync(store)

const HideOnScroll = (props: any) => {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const CoreApp = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  return (
    <Fragment>
      <HideOnScroll>
        <AppBar>
          <AppToolbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </AppBar>
      </HideOnScroll>
      <AppDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>
          <AppRouting />
        </Box>
      </Container>
    </Fragment>
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

const WithTheme = () => {
  const customTheme = createTheme(
    getTheme(useSelector(getDarkMode) ? 'dark' : 'light')
  )
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
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
