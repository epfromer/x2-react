import { useNavigation } from '@react-navigation/native'
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base'
import React from 'react'

interface Props {
  title: string
}
export default function AppHeader({ title }: Props) {
  const navigation: any = useNavigation()

  return (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => navigation.navigate('SearchView')}>
          <Icon name="search" />
        </Button>
      </Right>
    </Header>
  )
}
