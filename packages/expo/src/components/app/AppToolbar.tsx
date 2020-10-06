import React from 'react'
import { Header, Button, Icon } from 'react-native-elements'
import { useLocation, useHistory } from 'react-router-native'
import { routeNames } from '../../router/RouteSwitch'

export default function AppToolbar() {
  const location = useLocation()
  const history = useHistory()

  const GoBackIconButton = () => (
    <Button
      onPress={() => history.goBack()}
      icon={<Icon name="navigate-before" size={25} color="white" />}
    />
  )

  const HomeIconButton = () => (
    <Button
      onPress={() => history.push('/')}
      icon={<Icon name="home" size={25} color="white" />}
    />
  )

  console.log(location.pathname)
  // TODO map of pathname to string to display, import from router

  return (
    <Header
      placement="center"
      leftComponent={<GoBackIconButton />}
      centerComponent={{
        text: routeNames[location.pathname],
        style: { color: 'white' },
      }}
      rightComponent={<HomeIconButton />}
    />
  )
}
