import { getDarkMode, setDarkModeAsync, store } from '@klonzo/common'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Header, Icon, ThemeContext } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-native'
import { routeNames } from '../../router/AppRouting'
import { textColor } from '../../utils/appThemes'

export default function AppTopToolbar() {
  const location = useLocation()
  const history = useHistory()
  const darkMode = useSelector(getDarkMode)
  const { theme }: any = useContext(ThemeContext)

  const styles = StyleSheet.create({
    header: {
      color: textColor(theme),
      fontSize: 20,
    },
    button: {
      backgroundColor: theme.Header.containerStyle.backgroundColor,
    },
  })

  const GoBackIconButton = () => (
    <Button
      onPress={() => history.goBack()}
      buttonStyle={styles.button}
      icon={<Icon name="navigate-before" size={25} color={textColor(theme)} />}
    />
  )

  const DarkModeButton = () => (
    <Button
      onPress={() => setDarkModeAsync(store, darkMode ? false : true)}
      buttonStyle={styles.button}
      icon={
        <Icon
          name={darkMode ? 'brightness-high' : 'brightness-4'}
          size={25}
          color={textColor(theme)}
        />
      }
      testID="dark-mode-button"
    />
  )

  // console.log(location.pathname)

  return (
    <Header
      placement="center"
      leftComponent={<GoBackIconButton />}
      centerComponent={{
        text: routeNames[location.pathname],
        style: styles.header,
      }}
      rightComponent={<DarkModeButton />}
    />
  )
}
