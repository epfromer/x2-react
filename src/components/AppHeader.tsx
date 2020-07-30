import { useNavigation } from '@react-navigation/native'
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base'
import { StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { saveAppSettings, setReduxState } from '../store/'
import { RootState } from '../store/types'

interface Props {
  title: string
}
export default function AppHeader({ title }: Props) {
  const navigation: any = useNavigation()
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const styles = StyleSheet.create({
    container: {
      backgroundColor: useSelector(
        (state: RootState) => state.themePrimaryColor
      ),
    },
  })

  function setDarkMode(on: boolean) {
    setReduxState('darkMode', on)
    saveAppSettings()
  }

  return (
    <Header style={styles.container}>
      <Left>
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        {darkMode ? (
          <Button transparent onPress={() => setDarkMode(false)}>
            <Icon type="MaterialIcons" name="brightness-7" />
          </Button>
        ) : (
          <Button transparent onPress={() => setDarkMode(true)}>
            <Icon type="MaterialIcons" name="brightness-4" />
          </Button>
        )}
        <Button transparent onPress={() => navigation.navigate('SearchView')}>
          <Icon name="search" />
        </Button>
        <Button
          transparent
          onPress={() => navigation.navigate('AppSettingsView')}
        >
          <Icon name="settings" />
        </Button>
        <Button
          transparent
          onPress={() => navigation.navigate('DashboardView')}
        >
          <Icon type="MaterialIcons" name="dashboard" />
        </Button>
      </Right>
    </Header>
  )
}
