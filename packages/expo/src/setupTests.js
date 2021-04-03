import {
  setAllText,
  setBody,
  setCustodians,
  setEmail,
  setEmailSentByDay,
  setFrom,
  setSubject,
  setThemeName,
  setTo,
  setWordCloud,
  store,
  testCustodians,
  testEmail,
  testEmailSentByDay,
  testWordCloud,
} from '@klonzo/common'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import { render } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import { Provider } from 'react-redux'
import { Router } from 'react-router-native'
import { appThemes } from './utils/appThemes'

// eslint-disable-next-line no-undef
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

store.dispatch(setWordCloud(testWordCloud))
store.dispatch(setCustodians(testCustodians))
store.dispatch(setEmailSentByDay(testEmailSentByDay))
store.dispatch(setEmail(testEmail))
store.dispatch(setAllText('body'))
store.dispatch(setTo('body'))
store.dispatch(setFrom('body'))
store.dispatch(setSubject('body'))
store.dispatch(setBody('body'))
store.dispatch(setThemeName(appThemes[0].name))

export function renderComp(comp, history = createMemoryHistory()) {
  return render(
    <ThemeProvider theme={appThemes[0]}>
      <Router history={history}>
        <Provider store={store}>{comp}</Provider>
      </Router>
    </ThemeProvider>
  )
}
