import React from 'react'
import { SafeAreaView } from 'react-native'
import { NativeRouter } from 'react-router-native'
import RouteSwitch from './src/router/RouteSwitch'

const App: () => React.ReactNode = () => {
  return (
    <NativeRouter>
      <SafeAreaView>
        <RouteSwitch />
      </SafeAreaView>
    </NativeRouter>
  )
}

export default App
