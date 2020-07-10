import React from 'react'
import { Route, Switch } from 'react-router'
import BarView from '../views/BarView'
import ChordView from '../views/ChordView'
import DashboardView from '../views/DashboardView'

export default function RouteSwitch() {
  return (
    <Switch>
      <Route path="/ChordView">
        <ChordView />
      </Route>
      <Route path="/BarView">
        <BarView />
      </Route>
      <Route path="/">
        <DashboardView />
      </Route>
    </Switch>
  )
}
