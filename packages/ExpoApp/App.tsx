import React from 'react'
import { Provider } from 'react-redux'
import RouteSwitch from './src/router/RouteSwitch'
import store from './src/store'
import { fetchAndCache } from './src/store/actions'

fetchAndCache('emailSent')
fetchAndCache('wordCloud')
fetchAndCache('contacts')
fetchAndCache('emails')

export default function App() {
  return (
    <Provider store={store}>
      <RouteSwitch />
    </Provider>
  )
}
