import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import 'react-native-gesture-handler'
import DashboardView from './src/views/DashboardView'
import ChordView from './src/views/ChordView'

const Stack = createStackNavigator()

const App: () => React.ReactNode = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DashboardView"
          component={DashboardView}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen
          name="ChordView"
          component={ChordView}
          options={{ title: 'Chord' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
