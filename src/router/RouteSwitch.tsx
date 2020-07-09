import React from 'react'
import { Route, Switch } from 'react-router'
import BarView from '../views/BarView'

export default function RouteSwitch() {
  return (
    <Switch>
      <Route path="/BarView">
        <BarView />
      </Route>
    </Switch>
  )
}
