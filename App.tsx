import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import RouteSwitch from './src/router/RouteSwitch'
import store, { fetchAndCache } from './src/store'

fetchAndCache('emailSent')
fetchAndCache('wordCloud')
fetchAndCache('contacts')
fetchAndCache('emails')

const App: () => React.ReactNode = () => {
  return (
    <Provider store={store}>
      <RouteSwitch />
    </Provider>
  )
}

export default App
