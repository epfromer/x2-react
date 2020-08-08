import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppSettingsView from '../views/AppSettingsView'
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

export default function RouteSwitch() {
  return (
    <Switch>
      <Route path="/AppSettingsView">
        <AppSettingsView data-testid="switch" />
      </Route>
      <Route path="/SearchView">
        <SearchView />
      </Route>
      <Route path="/EmailDetailView/:id">
        <EmailDetailView />
      </Route>
      <Route path="/ChordView">
        <ChordView />
      </Route>
      <Route path="/NetworkGraphView">
        <NetworkGraphView />
      </Route>
      <Route path="/WordCloudView">
        <WordCloudView />
      </Route>
      <Route path="/VolumeTimelineView">
        <VolumeTimelineView />
      </Route>
      <Route path="/TreeMapView">
        <TreeMapView />
      </Route>
      <Route path="/EventTimelineView">
        <EventTimelineView />
      </Route>
      <Route path="/BarView">
        <BarView />
      </Route>
      <Route path="/PolarView">
        <PolarView />
      </Route>
      <Route path="/PieView">
        <PieView />
      </Route>
      <Route path="/">
        <DashboardView />
      </Route>
    </Switch>
  )
}