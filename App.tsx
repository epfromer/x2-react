import React from 'react'
import { SafeAreaView } from 'react-native'
import { NativeRouter, BackButton } from 'react-router-native'
import RouteSwitch from './src/router/RouteSwitch'

const App: () => React.ReactNode = () => {
  return (
    <NativeRouter>
      <SafeAreaView>
        <BackButton>
          <RouteSwitch />
        </BackButton>
      </SafeAreaView>
    </NativeRouter>
  )
}

export default App
