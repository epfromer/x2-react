import {
  blackBackground,
  getDarkMode,
  getUsername,
  signOut,
  store,
} from '@klonzo/common'
import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, ThemeContext } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import CustodianSettings from '../components/CustodianSettings'
import Gravatar from '../components/Gravatar'
import ThemePicker from '../components/ThemePicker'
import { textColor } from '../utils/appThemes'

export default function AppSettingsView() {
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)
  const username = useSelector(getUsername)
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    text: {
      marginTop: 5,
      backgroundColor: darkMode ? blackBackground : 'white',
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
      color: darkMode ? 'white' : 'black',
      marginTop: 5,
      marginLeft: 10,
      fontSize: 20,
    },
  })

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
      <ThemePicker />

      <Text style={styles.header}>Custodian Colors</Text>
      <CustodianSettings />
    </ScrollView>
  )
}
