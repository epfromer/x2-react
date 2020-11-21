import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  selectDarkMode,
  selectThemeName,
  store,
} from '@klonzo/common'
import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import 'react-native-gesture-handler'
import { Provider, useSelector } from 'react-redux'
import { BackButton, NativeRouter as Router } from 'react-router-native'
import { getTheme } from './src/utils/appThemes'
import AppBottomToolbar from './src/components/app/AppBottomToolbar'
import AppTopToolbar from './src/components/app/AppTopToolbar'
import RouteSwitch from './src/router/RouteSwitch'

getInitialDataAsync()
getEmailAsync()
// TODO - get initial dark mode from OS
loadAppSettingsAsync(store)

// TODO - change dark mode doesn't update theme; fixed in 3.0
function ThemedApp() {
  return (
    <ThemeProvider
      theme={getTheme(useSelector(selectThemeName))}
      useDark={useSelector(selectDarkMode)}
    >
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
