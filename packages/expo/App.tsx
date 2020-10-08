import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  selectDarkMode,
  store,
} from '@klonzo/common'
import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import 'react-native-gesture-handler'
import { Provider, useSelector } from 'react-redux'
import { BackButton, NativeRouter as Router } from 'react-router-native'
import AppBottomToolbar from './src/components/app/AppBottomToolbar'
import AppTopToolbar from './src/components/app/AppTopToolbar'
import RouteSwitch from './src/router/RouteSwitch'

getInitialDataAsync()
getEmailAsync()
// TODO - get initial dark mode from OS
loadAppSettingsAsync()

// TODO 1. clean up all references to color to reference theme
// TODO 2. create a few themes, theme chooser in settings as in web (checkboxes)
// TODO 3. do same in web

const purple = {
  // https://reactnativeelements.com/docs/button
  Button: {
    buttonStyle: {
      backgroundColor: '#6a1b9a',
    },
  },
  // https://reactnativeelements.com/docs/header
  Header: {
    containerStyle: {
      backgroundColor: '#38006b',
    },
  },
}

/* <ThemeProvider useDark={Appearance.getColorScheme() === 'dark'}> */

// TODO - change dark mode doesn't update theme; fixed in 3.0

function ThemedApp() {
  return (
    <ThemeProvider theme={purple} useDark={useSelector(selectDarkMode)}>
      <Router>
        <AppTopToolbar />
        <BackButton />
        <RouteSwitch />
        <AppBottomToolbar />
      </Router>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  )
}
