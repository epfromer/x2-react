import { setAuthenticated, setUsername } from '@klonzo/common'
import * as AuthSessionNew from 'expo-auth-session'
import jwtDecode from 'jwt-decode'
import React, { useContext, useState } from 'react'
import { Icon, ThemeContext } from 'react-native-elements'
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-native'
import ENV from '../../../env'
import { textColor } from '../../utils/appThemes'

// https://www.npmjs.com/package/react-native-material-bottom-navigation

export default function AppBottomToolbar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [activeTab, setActiveTab] = useState('home')
  const { theme }: any = useContext(ThemeContext)
  const barColor = theme.Header.containerStyle.backgroundColor

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

  const handleLoginResponse = (response: any) => {
    const decoded: any = jwtDecode(response.params.id_token)
    if (response.type === 'success') {
      dispatch(setAuthenticated(true))
      dispatch(setUsername(decoded.email))
      history.push('/AppSettingsView')
    }
  }

  const signIn = async () => {
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

  const tabs = [
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      barColor,
      action: () => history.push('/'),
    },
    {
      key: 'search',
      icon: 'search',
      label: 'Search',
      barColor,
      action: () => history.push('/SearchView'),
    },
    {
      key: 'settings',
      icon: 'settings',
      label: 'Settings',
      barColor,
      action: () => signIn(),
    },
  ]

  const renderTab = ({ tab, isActive }: any) => (
    <FullTab
      isActive={isActive}
      key={tab.icon}
      label={tab.label}
      labelStyle={{ color: textColor(theme) }}
      renderIcon={() => (
        <Icon size={24} color={textColor(theme)} name={tab.icon} />
      )}
    />
  )

  return (
    <BottomNavigation
      activeTab={activeTab}
      onTabPress={(tab: any) => {
        setActiveTab(tab.key)
        tab.action()
      }}
      renderTab={renderTab}
      tabs={tabs}
    />
  )
}
