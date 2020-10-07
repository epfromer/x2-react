import React from 'react'
import { Button, Header, Icon } from 'react-native-elements'
import { useHistory, useLocation } from 'react-router-native'
import { routeNames } from '../../router/RouteSwitch'

export default function AppTopToolbar() {
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

  // console.log(location.pathname)

  return (
    <Header
      placement="center"
      leftComponent={<GoBackIconButton />}
      centerComponent={{
        text: routeNames[location.pathname],
        style: { color: 'white', fontSize: 20 },
      }}
      rightComponent={<HomeIconButton />}
    />
  )
}
