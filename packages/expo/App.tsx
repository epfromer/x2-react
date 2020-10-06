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

getInitialDataAsync()
getEmailAsync()
loadAppSettingsAsync()

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppToolbar />
        <RouteSwitch />
      </Router>
    </Provider>
  )
}
