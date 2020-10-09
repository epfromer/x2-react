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
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

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

export function renderComp(comp) {
  return render(<Provider store={store}>{comp}</Provider>)
}

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
