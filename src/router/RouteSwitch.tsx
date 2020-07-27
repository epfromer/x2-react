import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import React from 'react'
import 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState } from '../store/types'
import BarView from '../views/BarView'
import ChordView from '../views/ChordView'
import DashboardView from '../views/DashboardView'
import EmailDetailView from '../views/EmailDetailView'
import EventTimelineView from '../views/EventTimelineView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import PolarView from '../views/PolarView'
import SearchView from '../views/SearchView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'
import WordCloudView from '../views/WordCloudView'

const Drawer = createDrawerNavigator()

export default function RouteSwitch() {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator initialRouteName="DashboardView">
        <Drawer.Screen
          name="DashboardView"
          component={DashboardView}
          options={{ title: 'Dashboard' }}
        />
        <Drawer.Screen
          name="SearchView"
          component={SearchView}
          options={{ title: 'Search' }}
        />
        <Drawer.Screen
          name="ChordView"
          component={ChordView}
          options={{ title: 'Chord' }}
        />
        <Drawer.Screen
          name="WordCloudView"
          component={WordCloudView}
          options={{ title: 'Word Cloud' }}
        />
        <Drawer.Screen
          name="VolumeTimelineView"
          component={VolumeTimelineView}
          options={{ title: 'Volume Timeline' }}
        />
        <Drawer.Screen
          name="NetworkGraphView"
          component={NetworkGraphView}
          options={{ title: 'Network Graph' }}
        />
        <Drawer.Screen
          name="TreeMapView"
          component={TreeMapView}
          options={{ title: 'Tree Map' }}
        />
        <Drawer.Screen
          name="EventTimelineView"
          component={EventTimelineView}
          options={{ title: 'Event Timeline' }}
        />
        <Drawer.Screen
          name="BarView"
          component={BarView}
          options={{ title: 'Bar' }}
        />
        <Drawer.Screen
          name="PolarView"
          component={PolarView}
          options={{ title: 'Polar' }}
        />
        <Drawer.Screen
          name="PieView"
          component={PieView}
          options={{ title: 'Pie' }}
        />
        <Drawer.Screen name="EmailDetail" component={EmailDetailView} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
