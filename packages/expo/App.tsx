import {
  getContactsAsync,
  getEmailAsync,
  getEmailSentAsync,
  getWordCloudAsync,
  loadAppSettingsAsync,
  store,
} from '@klonzo/common'
import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import RouteSwitch from './src/router/RouteSwitch'

getContactsAsync()
getWordCloudAsync()
getEmailSentAsync()
getEmailAsync()
loadAppSettingsAsync()

export default function App() {
  return (
    <Provider store={store}>
      <RouteSwitch />
    </Provider>
  )
}
