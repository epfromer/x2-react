import { authenticate, selectDarkMode } from '@klonzo/common'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'

export default function HomeView() {
  const history = useHistory()
  const darkMode = useSelector(selectDarkMode)
  const [username, setUsername] = useState('epfromer@gmail.com')
  const [password, setPassword] = useState('')
  const [authFailAlert, setAuthFailAlert] = useState(false)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#222222' : 'white',
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
    errorText: {
      color: 'red',
    },
  })

  const doAuthenticate = () => {
    if (authenticate(username, password)) {
      history.push('/AppSettingsView')
    } else {
      setAuthFailAlert(true)
    }
  }

  // https://reactnativeelements.com/docs/input/
  // https://reactnative.dev/docs/textinput.html

  return (
    <SafeAreaView style={styles.container}>
      <Input
        label="Email address"
        keyboardType="email-address"
        textContentType="emailAddress"
        labelStyle={styles.topField}
        inputStyle={styles.text}
        value={username}
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        testID="email"
        onChangeText={(s) => setUsername(s)}
        leftIcon={<Icon name="email" iconStyle={styles.text} />}
        errorStyle={styles.errorText}
        errorMessage={authFailAlert ? 'Incorrect username or password.' : ''}
        rightIcon={
          <Icon
            testID="close-email"
            name="close"
            iconStyle={styles.text}
            onPress={() => setUsername('')}
          />
        }
      />
      <Input
        label="Password"
        textContentType="password"
        labelStyle={styles.label}
        inputStyle={styles.text}
        value={password}
        autoCompleteType="password"
        autoCapitalize="none"
        testID="password"
        secureTextEntry={true}
        onChangeText={(s) => setPassword(s)}
        leftIcon={<Icon name="lock" iconStyle={styles.text} />}
        errorStyle={styles.errorText}
        errorMessage={authFailAlert ? 'Incorrect username or password.' : ''}
        rightIcon={
          <Icon
            testID="close-password"
            name="close"
            iconStyle={styles.text}
            onPress={() => setPassword('')}
          />
        }
      />
      <Button
        testID="authenticate"
        disabled={username === '' || password === ''}
        onPress={doAuthenticate}
        title="Sign In"
      />
    </SafeAreaView>
  )
}
