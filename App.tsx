import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { NativeRouter } from 'react-router-native'
import RouteSwitch from './src/router/RouteSwitch'

const App: () => React.ReactNode = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <NativeRouter>
          <View style={styles.container}>
            <RouteSwitch />
          </View>
        </NativeRouter>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default App
