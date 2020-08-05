import { HelloWorld } from '@x2react/shared'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import store, { fetchAndCache, getLocalStorage } from './src/store'
import RouteSwitch from './src/router/RouteSwitch'

fetchAndCache('emailSent')

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RouteSwitch />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
