import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'jest-fetch-mock'
import {
  clearSearch,
  getCustodiansAsync,
  getEmailAsync,
  getEmailById,
  getEmailIndex,
  getNextEmailId,
  getPreviousEmailId,
  loadAppSettingsAsync,
  selectAllText,
  selectBody,
  selectEmailListPage,
  selectEmailReceivers,
  selectEmailSenders,
  selectEmailSentByCustodian,
  selectFrom,
  selectQueryOrder,
  selectQuerySort,
  selectSent,
  selectSubject,
  selectTimeSpan,
  selectTo,
  setAllText,
  setBody,
  setCustodians,
  setEmail,
  setEmailSentByDay,
  setFrom,
  setSubject,
  setTo,
  setWordCloud,
  store,
  testCustodians,
  testEmail,
  testEmailSentByDay,
  testWordCloud,
} from '../index'
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

store.dispatch(setWordCloud(testWordCloud))
store.dispatch(setCustodians(testCustodians))
store.dispatch(setEmailSentByDay(testEmailSentByDay))
store.dispatch(setEmail(testEmail))
store.dispatch(setAllText('body'))
store.dispatch(setTo('body'))
store.dispatch(setFrom('body'))
store.dispatch(setSubject('body'))
store.dispatch(setBody('body'))

test('getEmailById', () => {
  expect(getEmailById('dd8b6148-aea3-4d3a-bbda-e539f6c01820')).toBeTruthy()
})

test('getNextEmailId', () => {
  expect(getNextEmailId('dd8b6148-aea3-4d3a-bbda-e539f6c01820')).toBeTruthy()
})

test('getPreviousEmailId', () => {
  expect(
    getPreviousEmailId('dd8b6148-aea3-4d3a-bbda-e539f6c01820')
  ).toBeTruthy()
})

test('getEmailIndex', () => {
  expect(getEmailIndex('dd8b6148-aea3-4d3a-bbda-e539f6c01820')).toBeTruthy()
})

test('getWordCloudAsync', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(testCustodians))
  await getCustodiansAsync()
  expect(store.getState().custodians.custodians).toEqual(testCustodians)
})

test('loadAppSettingsAsync', async () => {
  await loadAppSettingsAsync()
  expect(store.getState().appSettings.darkMode).toEqual(false)
})

test('getEmailAsync', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(testEmail))
  await getEmailAsync()
  expect(store.getState().email.email).toEqual(testEmail)
})

test('getEmailIndex', () => {
  store.dispatch(clearSearch())
  expect(selectAllText(store.getState())).toEqual('')
  expect(selectBody(store.getState())).toEqual('')
  expect(selectEmailListPage(store.getState())).toEqual(0)
  expect(selectFrom(store.getState())).toEqual('')
  expect(selectQueryOrder(store.getState())).toEqual(1)
  expect(selectQuerySort(store.getState())).toEqual('sent')
  expect(selectSent(store.getState())).toEqual('')
  expect(selectSubject(store.getState())).toEqual('')
  expect(selectTimeSpan(store.getState())).toEqual(0)
  expect(selectTo(store.getState())).toEqual('')
})

test('selectEmailSenders', () => {
  expect(selectEmailSenders(store.getState())).toBeTruthy()
})

test('selectEmailReceivers', () => {
  expect(selectEmailReceivers(store.getState())).toBeTruthy()
})

test('selectEmailSentByCustodian', () => {
  expect(selectEmailSentByCustodian(store.getState())).toBeTruthy()
})
