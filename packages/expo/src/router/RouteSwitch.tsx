import { selectAuthenticated } from '@klonzo/common'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-native'
import AppSettingsView from '../views/AppSettingsView'
import BarView from '../views/BarView'
import EmailDetailView from '../views/EmailDetailView'
import HomeView from '../views/HomeView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import PolarView from '../views/PolarView'
import SearchHistoryView from '../views/SearchHistoryView'
import SearchView from '../views/SearchView'
import SignInView from '../views/SignInView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'

// https://reactrouter.com/native/guides/quick-start

const GuardedRoute = ({ component: Component, auth, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} /> : <Redirect to="/SignInView" />
    }
  />
)

export const routeNames = {
  '/AppSettingsView': 'Settings',
  '/SignInView': 'Sign In',
  '/SearchView': 'Search',
  '/PieView': 'Pie',
  '/BarView': 'Bar',
  '/NetworkGraphView': 'Network Graph',
  '/PolarView': 'Polar',
  '/TreeMapView': 'Tree Map',
  '/VolumeTimelineView': 'Volume Timeline',
  '/EmailDetailView': 'Email Detail',
  '/': 'Home',
}

export default function RouteSwitch() {
  const authenticated = useSelector(selectAuthenticated)

  return (
    <Switch>
      <GuardedRoute
        path="/AppSettingsView"
        component={AppSettingsView}
        auth={authenticated}
        testID="app-settings"
      />
      <Route path="/SignInView">
        <SignInView />
      </Route>
      <Route path="/SearchHistoryView">
        <SearchHistoryView />
      </Route>
      <Route path="/SearchView">
        <SearchView data-testid="switch" />
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
      <Route path="/PolarView">
        <PolarView />
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
