import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock' // should come first, before store
import {
  setAllText,
  setBody,
  setCustodians,
  setEmail,
  setEmailSentByDay,
  setFrom,
  setSearchHistory,
  setSubject,
  setTo,
  setWordCloud,
  store,
  testCustodians,
  testEmail,
  testEmailSentByDay,
  testSearchHistory,
  testWordCloud,
} from '@klonzo/common'
import { render } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-native'
import { ThemeProvider } from 'react-native-elements'
import { appThemes } from './components/appThemes'

// eslint-disable-next-line no-undef
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

store.dispatch(setWordCloud(testWordCloud))
store.dispatch(setCustodians(testCustodians))
store.dispatch(setEmailSentByDay(testEmailSentByDay))
store.dispatch(setEmail(testEmail))
store.dispatch(setSearchHistory(testSearchHistory))
store.dispatch(setAllText('body'))
store.dispatch(setTo('body'))
store.dispatch(setFrom('body'))
store.dispatch(setSubject('body'))
store.dispatch(setBody('body'))

export function renderComp(comp, history = createMemoryHistory()) {
  return render(
    <ThemeProvider theme={appThemes[0]}>
      <Router history={history}>
        <Provider store={store}>{comp}</Provider>
      </Router>
    </ThemeProvider>
  )
}
