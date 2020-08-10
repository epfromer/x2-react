import { fetchAndCache, getLocalStorage, store } from '@klonzo/shared'
import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import RouteSwitch from './src/router/RouteSwitch'

fetchAndCache('emailSent')
fetchAndCache('wordCloud')
fetchAndCache('contacts')
fetchAndCache('emails')
getLocalStorage()

export default function App() {
  return (
    <Provider store={store}>
      <RouteSwitch />
    </Provider>
  )
}
