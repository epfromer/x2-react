import React from 'react'
import { Route, Switch } from 'react-router-native'
import AppSettingsView from '../views/AppSettingsView'
import BarView from '../views/BarView'
import EmailDetailView from '../views/EmailDetailView'
import HomeView from '../views/HomeView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import SearchHistoryView from '../views/SearchHistoryView'
import SearchView from '../views/SearchView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'

// https://reactrouter.com/native/guides/quick-start

export const routeNames = {
  '/AppSettingsView': 'Settings',
  '/SearchView': 'Search',
  '/PieView': 'Pie',
  '/BarView': 'Bar',
  '/NetworkGraphView': 'Network Graph',
  '/TreeMapView': 'Tree Map',
  '/VolumeTimelineView': 'Volume Timeline',
  '/EmailDetailView': 'Email Detail',
  '/': 'Home',
}

export default function AppRouting() {
  return (
    <Switch>
      <Route path="/AppSettingsView">
        <AppSettingsView />
      </Route>
      <Route path="/SearchHistoryView">
        <SearchHistoryView />
      </Route>
      <Route path="/SearchView">
        <SearchView />
      </Route>
      <Route path="/PieView">
        <PieView />
      </Route>
      <Route path="/BarView">
        <BarView />
      </Route>
      <Route path="/NetworkGraphView">
        <NetworkGraphView />
      </Route>
      <Route path="/TreeMapView">
        <TreeMapView />
      </Route>
      <Route path="/VolumeTimelineView">
        <VolumeTimelineView />
      </Route>
      <Route path="/EmailDetailView/:id">
        <EmailDetailView />
      </Route>
      <Route exact path="/">
        <HomeView />
      </Route>
    </Switch>
  )
}
