//
import {
  getDarkMode,
  getEmailAsync,
  getInitialDataAsync,
  getThemeName,
  loadAppSettingsAsync,
  store,
} from '@klonzo/common'
import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import 'react-native-gesture-handler'
import { Provider, useSelector } from 'react-redux'
import { BackButton, NativeRouter as Router } from 'react-router-native'
import AppBottomToolbar from './src/components/app/AppBottomToolbar'
import AppTopToolbar from './src/components/app/AppTopToolbar'
import AppRouting from './src/router/AppRouting'
import { getTheme } from './src/utils/appThemes'

getInitialDataAsync(store)
getEmailAsync(store)
loadAppSettingsAsync(store)

// TODO fix RNE theme
// RNE themeing is not truly dynamic.  If the theme for ThemeProvider changes,
// the new theme isn't deployed.  Need to do an updateTheme.  However, since the
// default theme is set first, then the user selected theme async  2nd, it never gets
// updated.  Need to await loadAppSettingsAsync and then set the theme in ThemeProvider.
function ThemedApp() {
  return (
    <ThemeProvider
      theme={getTheme(useSelector(getThemeName))}
      useDark={useSelector(getDarkMode)}
    >
      <Router>
        <AppTopToolbar />
        <BackButton />
        <AppRouting />
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
