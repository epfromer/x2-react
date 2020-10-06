import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  store,
} from '@klonzo/common'
import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { BackButton, NativeRouter as Router } from 'react-router-native'
import AppToolbar from './src/components/app/AppToolbar'
import RouteSwitch from './src/router/RouteSwitch'

getInitialDataAsync()
getEmailAsync()
// TODO - get dark mode from OS
loadAppSettingsAsync()

// TODO
// console.log(Appearance.getColorScheme())

{
  /* <ThemeProvider useDark={Appearance.getColorScheme() === 'dark'}> */
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider useDark={true}>
        <Router>
          <AppToolbar />
          <BackButton />
          <RouteSwitch />
        </Router>
      </ThemeProvider>
    </Provider>
  )
}
