import { authenticate } from '@klonzo/common'
import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, Icon, Input, ThemeContext } from 'react-native-elements'
import { useHistory } from 'react-router-native'
import { textColor } from '../utils/appThemes'
import ENV from '../../env'
import * as AuthSessionNew from 'expo-auth-session'

export default function SignInView() {
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)
  const [username, setUsername] = useState('epfromer@gmail.com')
  const [password, setPassword] = useState('')
  const [authFailAlert, setAuthFailAlert] = useState(false)
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.white },
    label: { color: theme.colors.black },
    buttonText: { color: textColor(theme) },
    topField: { marginTop: 15, color: theme.colors.black },
    text: { color: theme.colors.black },
    errorText: { color: 'red' },
  })

  const doAuthenticate = () => {
    if (authenticate(username, password)) {
      history.push('/AppSettingsView')
    } else {
      setAuthFailAlert(true)
    }
  }

  const toQueryString = (params: any) =>
    '?' +
    Object.entries(params)
      .map(
        //@ts-ignore
        ([key, value]) =>
          //@ts-ignore
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')

  // https://reactnativeelements.com/docs/input/
  // https://reactnative.dev/docs/textinput.html

  const handleLoginResponse = (response: any) => {
    console.log(response)
  }

  const doLogin = async () => {
    const params = {
      client_id: ENV.auth0ClientId,
      redirect_uri: AuthSessionNew.makeRedirectUri({ useProxy: true }),
      // response_type:
      // id_token will return a JWT token with the profile as described on the scope
      // token will return access_token to use with further api calls
      response_type: 'token id_token',
      nonce: 'nonce', // ideally, this will be a random value
      rememberLastLogin: true,
    }
    const queryParams = toQueryString(params)
    const authUrl = `https://${ENV.auth0Domain}/authorize${queryParams}`
    const response = await AuthSessionNew.startAsync({
      authUrl,
      showInRecents: true,
    })
    return handleLoginResponse(response)
  }

  doLogin()

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
            testID="set-username"
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
            testID="set-password"
            name="close"
            iconStyle={styles.text}
            onPress={() => setPassword('')}
          />
        }
      />
      <Button
        testID="authenticate"
        titleStyle={styles.buttonText}
        disabled={username === '' || password === ''}
        onPress={doAuthenticate}
        title="Sign In"
      />
    </SafeAreaView>
  )
}
