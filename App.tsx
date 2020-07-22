import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store, { fetchAndCache } from './src/store'
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

const Drawer = createDrawerNavigator()

fetchAndCache('emailSent')
fetchAndCache('wordCloud')
fetchAndCache('contacts')
fetchAndCache('emails')

const App: () => React.ReactNode = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
