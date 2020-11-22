import {
  getDarkMode,
  selectUsername,
  setDarkModeAsync,
  signOut,
  store,
} from '@klonzo/common'
import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { Button, ThemeContext } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import { textColor } from '../utils/appThemes'
import CustodianSettings from '../components/CustodianSettings'
import Gravatar from '../components/Gravatar'
import ThemePicker from '../components/ThemePicker'

export default function AppSettingsView() {
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)
  const darkMode = useSelector(getDarkMode)
  const username = useSelector(selectUsername)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    text: {
      marginTop: 5,
      color: theme.colors.black,
    },
    buttonText: {
      color: textColor(theme),
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 10,
    },
    header: {
      color: theme.colors.black,
      marginTop: 5,
      marginLeft: 10,
      fontSize: 20,
    },
  })

  const DarkModeSwitch = () => (
    <View style={styles.itemRow}>
      <Text style={styles.text}>Dark mode {darkMode ? 'on' : 'off'}</Text>
      <Switch
        value={darkMode}
        onValueChange={() => setDarkModeAsync(store, darkMode ? false : true)}
      />
    </View>
  )

  const doSignOut = () => {
    signOut(store)
    history.push('/')
  }

  const SignOutButton = () => (
    <View style={styles.itemRow}>
      <Text style={styles.text}>{username}</Text>
      <Gravatar email={username} />
      <Button
        testID="sign-out"
        titleStyle={styles.buttonText}
        onPress={doSignOut}
        buttonStyle={
          {
            width: 100,
          } as any
        }
        title="Sign Out"
      />
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <SignOutButton />

      <Text style={styles.header}>App Theme</Text>
      <DarkModeSwitch />
      <ThemePicker />

      <Text style={styles.header}>Custodian Colors</Text>
      <CustodianSettings />
    </ScrollView>
  )
}
