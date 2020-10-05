import { selectDarkMode } from '@klonzo/common'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useSelector } from 'react-redux'

interface Props {
  navigation: any
}
export default function HomeView({ navigation }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authFailAlert, setAuthFailAlert] = useState(false)
  const darkMode = useSelector(selectDarkMode)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      color: darkMode ? 'white' : 'black',
    },
    topField: {
      marginTop: 15,
      color: darkMode ? 'white' : 'black',
    },
    text: {
      color: darkMode ? 'white' : 'black',
    },
  })

  const doAuthenticate = () => {
    console.log('authenticate')
    // if (authenticate(username, password)) {
    //   history.push('/AppSettingsView')
    // } else {
    //   setAuthFailAlert(true)
    // }
  }

  return (
    <SafeAreaView>
      <Input
        label="Email address"
        labelStyle={styles.topField}
        inputStyle={styles.text}
        value={username}
        testID="email"
        onChangeText={(s) => setUsername(s)}
        rightIcon={
          <Icon
            testID="close-all-text"
            name="close"
            iconStyle={styles.text}
            onPress={() => setUsername('')}
          />
        }
      />
      <Input
        label="Password"
        labelStyle={styles.label}
        inputStyle={styles.text}
        value={password}
        testID="password"
        onChangeText={(s) => setPassword(s)}
        rightIcon={
          <Icon
            name="close"
            iconStyle={styles.text}
            onPress={() => setPassword('')}
          />
        }
      />
      <Button
        testID="authenticate"
        buttonStyle={styles.button}
        disabled={username === '' || password === ''}
        onPress={doAuthenticate}
        title="Sign In"
      />
    </SafeAreaView>
  )
}
