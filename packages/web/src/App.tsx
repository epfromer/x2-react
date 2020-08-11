import { fetchAndCache, getLocalStorage, RootState } from '@klonzo/common'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import AppDrawer from './components/app/AppDrawer'
import AppFooter from './components/app/AppFooter'
import AppToolbar from './components/app/AppToolbar'
import RouteSwitch from './router/RouteSwitch'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '98vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
}))

fetchAndCache('emailSent')
fetchAndCache('wordCloud')
fetchAndCache('contacts')
fetchAndCache('emails')
getLocalStorage()

export default function App() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const darkMode = useSelector((state: RootState) => state.darkMode)

  const palette: any = {}
  if (darkMode) palette.type = 'dark'
  const customTheme = createMuiTheme({ palette })

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
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
          <AppFooter />
        </div>
      </Router>
    </ThemeProvider>
  )
}
