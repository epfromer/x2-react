import {
  selectDarkMode,
  selectUsername,
  setDarkMode,
  signOut,
} from '@klonzo/common'
import React from 'react'
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustodianSettings from '../components/CustodianSettings'
import Gravatar from '../components/Gravatar'
import { Button } from 'react-native-elements'

interface Props {
  route: any
  navigation: any
}
export default function AppSettingsView({ navigation }: Props) {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const username = useSelector(selectUsername)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
          navigation.navigate('HomeView')
        }}
        title="Sign Out"
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <SignOutButton />
      <DarkModeSwitch />
      <CustodianSettings />
    </SafeAreaView>
  )
}
