import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'jest-fetch-mock'
import {
  clearSearch,
  getAllText,
  getBody,
  getCustodiansAsync,
  getEmailAsync,
  getEmailById,
  getEmailIndex,
  getEmailListPage,
  getEmailReceivers,
  getEmailSenders,
  getEmailSentByCustodian,
  getFrom,
  getInitialDataAsync,
  getNextEmailId,
  getOrder,
  getPreviousEmailId,
  getSent,
  getSort,
  getSubject,
  getTo,
  loadAppSettingsAsync,
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

test('getEmailById', () => {
  expect(
    getEmailById(store, 'f3281cc4-90a9-4dcb-86bd-d705fc847985')
  ).toBeTruthy()
})

test('getNextEmailId', () => {
  expect(
    getNextEmailId(store, 'f3281cc4-90a9-4dcb-86bd-d705fc847985')
  ).toBeTruthy()
})

test('getPreviousEmailId', () => {
  expect(
    getPreviousEmailId(store, 'f3281cc4-90a9-4dcb-86bd-d705fc847985')
  ).toBeTruthy()
})

test('getEmailIndex', () => {
  expect(
    getEmailIndex(store, 'f3281cc4-90a9-4dcb-86bd-d705fc847985')
  ).toBeTruthy()
})

test('getWordCloudAsync', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(testCustodians))
  await getCustodiansAsync(store)
  expect(store.getState().custodians.custodians).toEqual(testCustodians)
})

test('loadAppSettingsAsync', async () => {
  await loadAppSettingsAsync(store)
  expect(store.getState().appSettings.darkMode).toEqual(false)
})

test('getEmailAsync', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(testEmail))
  await getEmailAsync(store)
  expect(store.getState().email.email).toEqual(testEmail)
})

test('getEmailIndex', () => {
  store.dispatch(clearSearch())
  expect(getAllText(store.getState())).toEqual('')
  expect(getBody(store.getState())).toEqual('')
  expect(getEmailListPage(store.getState())).toEqual(0)
  expect(getFrom(store.getState())).toEqual('')
  expect(getOrder(store.getState())).toEqual(1)
  expect(getSort(store.getState())).toEqual('sent')
  expect(getSent(store.getState())).toEqual('')
  expect(getSubject(store.getState())).toEqual('')
  expect(getTo(store.getState())).toEqual('')
})

test('getEmailSenders', () => {
  expect(getEmailSenders(store.getState())).toBeTruthy()
})

test('getEmailReceivers', () => {
  expect(getEmailReceivers(store.getState())).toBeTruthy()
})

test('getEmailSentByCustodian', () => {
  expect(getEmailSentByCustodian(store.getState())).toBeTruthy()
})

test('initial data', () => {
  getInitialDataAsync(store)
})
