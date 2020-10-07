import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  store,
} from '@klonzo/common'
import React from 'react'
import { Button, ThemeProvider } from 'react-native-elements'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { BackButton, NativeRouter as Router } from 'react-router-native'
import AppTopToolbar from './src/components/app/AppTopToolbar'
import AppBottomToolbar from './src/components/app/AppBottomToolbar'
import RouteSwitch from './src/router/RouteSwitch'
import { Appearance } from 'react-native'

getInitialDataAsync()
getEmailAsync()
// TODO - get dark mode from OS
loadAppSettingsAsync()

// TODO
// console.log(Appearance.getColorScheme())

const theme = {
  // https://reactnativeelements.com/docs/button
  Button: {
    titleStyle: {
      color: 'black',
      backgroundColor: 'red',
    },
    buttonStyle: {
      backgroundColor: 'purple',
    },
  },
  // https://reactnativeelements.com/docs/header
  Header: {
    containerStyle: {
      backgroundColor: 'orange',
    },
  },
}

{
  /* <ThemeProvider useDark={Appearance.getColorScheme() === 'dark'}> */
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme} useDark={true}>
        <Router>
          <AppTopToolbar />
          <BackButton />
          <RouteSwitch />
          <AppBottomToolbar />
        </Router>
      </ThemeProvider>
    </Provider>
  )
}
