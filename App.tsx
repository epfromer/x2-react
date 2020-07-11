import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import 'react-native-gesture-handler'
import BarView from './src/views/BarView'
import ChordView from './src/views/ChordView'
import DashboardView from './src/views/DashboardView'
import EventTimelineView from './src/views/EventTimelineView'
import NetworkGraphView from './src/views/NetworkGraphView'
import PieView from './src/views/PieView'
import PolarView from './src/views/PolarView'
import SearchView from './src/views/SearchView'
import TreeMapView from './src/views/TreeMapView'
import VolumeTimelineView from './src/views/VolumeTimelineView'
import WordCloudView from './src/views/WordCloudView'

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
        <Stack.Screen
          name="WordCloudView"
          component={WordCloudView}
          options={{ title: 'Word Cloud' }}
        />
        <Stack.Screen
          name="VolumeTimelineView"
          component={VolumeTimelineView}
          options={{ title: 'Volume Timeline' }}
        />
        <Stack.Screen
          name="NetworkGraphView"
          component={NetworkGraphView}
          options={{ title: 'Network Graph' }}
        />
        <Stack.Screen
          name="TreeMapView"
          component={TreeMapView}
          options={{ title: 'Tree Map' }}
        />
        <Stack.Screen
          name="EventTimelineView"
          component={EventTimelineView}
          options={{ title: 'Event Timeline' }}
        />
        <Stack.Screen
          name="BarView"
          component={BarView}
          options={{ title: 'Bar' }}
        />
        <Stack.Screen
          name="PolarView"
          component={PolarView}
          options={{ title: 'Polar' }}
        />
        <Stack.Screen
          name="PieView"
          component={PieView}
          options={{ title: 'Pie' }}
        />
        <Stack.Screen
          name="SearchView"
          component={SearchView}
          options={{ title: 'Search' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
