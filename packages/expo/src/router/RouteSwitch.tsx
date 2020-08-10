import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootState } from '@x2react/shared'
import React from 'react'
import { useSelector } from 'react-redux'
import AppSettingsView from '../views/AppSettingsView'
import BarView from '../views/BarView'
import ChordView from '../views/ChordView'
import EmailDetailView from '../views/EmailDetailView'
import EventTimelineView from '../views/EventTimelineView'
import HomeView from '../views/HomeView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import PolarView from '../views/PolarView'
import SearchView from '../views/SearchView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'
import WordCloudView from '../views/WordCloudView'

const Stack = createStackNavigator()

export default function RouteSwitch() {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{ title: 'X2 Home' }}
        />
        <Stack.Screen
          name="AppSettingsView"
          component={AppSettingsView}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="SearchView"
          component={SearchView}
          options={{ title: 'Search' }}
        />
        <Stack.Screen
          name="PieView"
          component={PieView}
          options={{ title: 'Pie' }}
        />
        <Stack.Screen
          name="BarView"
          component={BarView}
          options={{ title: 'Bar' }}
        />
        <Stack.Screen
          name="ChordView"
          component={ChordView}
          options={{ title: 'Chord' }}
        />
        <Stack.Screen
          name="NetworkGraphView"
          component={NetworkGraphView}
          options={{ title: 'Network Graph' }}
        />
        <Stack.Screen
          name="PolarView"
          component={PolarView}
          options={{ title: 'Polar' }}
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
          name="VolumeTimelineView"
          component={VolumeTimelineView}
          options={{ title: 'Volume Timeline' }}
        />
        <Stack.Screen
          name="WordCloudView"
          component={WordCloudView}
          options={{ title: 'Word Cloud' }}
        />
        <Stack.Screen
          name="EmailDetail"
          component={EmailDetailView}
          options={{ title: 'Email Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
