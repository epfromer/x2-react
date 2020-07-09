import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Link, NativeRouter } from 'react-router-native'
import RouteSwitch from './src/router/RouteSwitch'

const App: () => React.ReactNode = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <NativeRouter>
            <View style={styles.container}>
              <Link to="/BarView">
                <Text>BarView</Text>
              </Link>
              <RouteSwitch />
            </View>
          </NativeRouter>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 25,
    // padding: 10,
  },
})

export default App
