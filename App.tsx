import { Header } from 'native-base'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { BackButton, NativeRouter } from 'react-router-native'
import RouteSwitch from './src/router/RouteSwitch'

const App: () => React.ReactNode = () => {
  return (
    <NativeRouter>
      <SafeAreaView>
        <BackButton>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Header
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <RouteSwitch />
          </ScrollView>
        </BackButton>
      </SafeAreaView>
    </NativeRouter>
  )
}

export default App
