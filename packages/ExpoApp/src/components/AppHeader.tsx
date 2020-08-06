import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Header, Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { RootState } from '../store/types'

interface Props {
  title: string
}
export default function AppHeader({ title }: Props) {
  const navigation: any = useNavigation()

  // TODO - put this in app settings
  // function setDarkMode(on: boolean) {
  //   setReduxState('darkMode', on)
  //   saveAppSettings()
  // }

  return (
    <Header
      placement="left"
      backgroundColor={useSelector(
        (state: RootState) => state.themePrimaryColor
      )}
      leftComponent={
        <Icon
          name="menu"
          color="#fff"
          onPress={() => navigation.openDrawer()}
        />
      }
      centerComponent={{ text: title, style: { color: '#fff' } }}
      rightComponent={
        <Icon
          name="settings"
          color="#fff"
          onPress={() => navigation.navigate('AppSettingsView')}
        />
      }
    />
  )
}
