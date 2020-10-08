import {
  selectDarkMode,
  selectUsername,
  setDarkMode,
  signOut,
} from '@klonzo/common'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import CustodianSettings from '../components/CustodianSettings'
import Gravatar from '../components/Gravatar'

export default function AppSettingsView() {
  const history = useHistory()
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const username = useSelector(selectUsername)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#222222' : 'white',
    },
    text: {
      marginTop: 5,
      color: darkMode ? 'white' : 'black',
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 10,
    },
    header: {
      marginLeft: 10,
      fontSize: 20,
    },
  })

  const DarkModeSwitch = () => (
    <View style={styles.itemRow}>
      <Text style={styles.text}>Dark mode {darkMode ? 'on' : 'off'}</Text>
      <Switch
        value={darkMode}
        onValueChange={() => dispatch(setDarkMode(darkMode ? false : true))}
      />
    </View>
  )

  const SignOutButton = () => (
    <View style={styles.itemRow}>
      <Text style={styles.text}>{username}</Text>
      <Gravatar email={username} />
      <Button
        testID="sign-out"
        onPress={() => {
          signOut()
          history.push('/')
        }}
        title="Sign Out"
      />
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <SignOutButton />
      <DarkModeSwitch />
      <Text style={styles.header}>Custodian Colors</Text>
      <CustodianSettings />
      <Text style={styles.header}>App Theme Colors</Text>
    </ScrollView>
  )
}
