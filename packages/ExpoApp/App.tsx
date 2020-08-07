import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import RouteSwitch from './src/router/RouteSwitch'
import store from './src/store'
import { fetchAndCache, getLocalStorage } from './src/store/actions'

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
