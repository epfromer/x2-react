import React from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'

const App: () => React.ReactNode = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>some text</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
