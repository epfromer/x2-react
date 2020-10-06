import React from 'react'
import { Header, Button, Icon } from 'react-native-elements'
import { useLocation, useHistory } from 'react-router-native'

export default function AppToolbar() {
  const location = useLocation()
  const history = useHistory()

  const GoBackIconButton = () => (
    <Button
      icon={
        <Icon
          name="navigate-before"
          size={25}
          color="white"
          onPress={() => history.goBack()}
        />
      }
    />
  )

  const HomeIconButton = () => (
    <Button
      icon={
        <Icon
          name="home"
          size={25}
          color="white"
          onPress={() => history.push('/')}
        />
      }
    />
  )

  console.log(location)
  // map of pathname to string to display, import from router

  return (
    <Header
      placement="center"
      leftComponent={<GoBackIconButton />}
      centerComponent={{ text: 'MY TITLE', style: { color: 'white' } }}
      rightComponent={<HomeIconButton />}
    />
  )
}
