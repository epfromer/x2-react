import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  store,
} from '@klonzo/common'
import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { NativeRouter as Router } from 'react-router-native'
import RouteSwitch from './src/router/RouteSwitch'
import AppToolbar from './src/components/app/AppToolbar'
import { Appearance } from 'react-native'
import { ThemeProvider } from 'react-native-elements'

getInitialDataAsync()
getEmailAsync()
// TODO - get dark mode from OS
loadAppSettingsAsync()

// TODO
// console.log(Appearance.getColorScheme())

{/* <ThemeProvider useDark={Appearance.getColorScheme() === 'dark'}> */}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider useDark={true}>
        <Router>
          <AppToolbar />
          <RouteSwitch />
        </Router>
      </ThemeProvider>
    </Provider>
  )
}
