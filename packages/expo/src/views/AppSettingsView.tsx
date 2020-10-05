import { selectDarkMode, setDarkMode } from '@klonzo/common'
import React from 'react'
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustodianSettings from '../components/CustodianSettings'

export default function AppSettingsView() {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)

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
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
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

  return (
    <SafeAreaView style={styles.container}>
      <DarkModeSwitch />
      <CustodianSettings />
    </SafeAreaView>
  )
}
