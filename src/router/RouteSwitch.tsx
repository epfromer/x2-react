import React from 'react'
import { Route, Switch } from 'react-router'
import BarView from '../views/BarView'
import DashboardView from '../views/DashboardView'

export default function RouteSwitch() {
  return (
    <Switch>
      <Route path="/BarView">
        <BarView />
      </Route>
      <Route path="/">
        <DashboardView />
      </Route>
    </Switch>
  )
}
