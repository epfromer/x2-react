// @ts-ignore
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'jest-fetch-mock'
import {
  authenticate,
  clearSearch,
  getCustodiansAsync,
  getEmailAsync,
  getEmailById,
  getEmailIndex,
  getInitialDataAsync,
  getNextEmailId,
  getPreviousEmailId,
  getSearchHistoryAsync,
  loadAppSettingsAsync,
  searchHistoryExecute,
  selectAllText,
  selectBody,
  selectEmailListPage,
  selectEmailReceivers,
  selectEmailSenders,
  selectEmailSentByCustodian,
  selectFrom,
  selectOrder,
  selectSent,
  selectSort,
  selectSubject,
  selectTo,
  selectUsername,
  setAllText,
  setBody,
  setCustodians,
  setEmail,
  setEmailSentByDay,
  setFrom,
  setSubject,
  setTo,
  setWordCloud,
  signOut,
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
  expect(getEmailById('f3281cc4-90a9-4dcb-86bd-d705fc847985')).toBeTruthy()
})

test('getNextEmailId', () => {
  expect(getNextEmailId('f3281cc4-90a9-4dcb-86bd-d705fc847985')).toBeTruthy()
})

test('getPreviousEmailId', () => {
  expect(
    getPreviousEmailId('f3281cc4-90a9-4dcb-86bd-d705fc847985')
  ).toBeTruthy()
})

test('getEmailIndex', () => {
  expect(getEmailIndex('f3281cc4-90a9-4dcb-86bd-d705fc847985')).toBeTruthy()
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
  expect(selectOrder(store.getState())).toEqual(1)
  expect(selectSort(store.getState())).toEqual('sent')
  expect(selectSent(store.getState())).toEqual('')
  expect(selectSubject(store.getState())).toEqual('')
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

test('authenticate', () => {
  expect(authenticate('foo', 'foo')).toBeTruthy()
  signOut()
  expect(selectUsername(store.getState())).toEqual('')
})

test('authenticate', () => {
  expect(authenticate('foo', 'foo')).toBeTruthy()
  signOut()
  expect(selectUsername(store.getState())).toEqual('')
})

test('search history', () => {
  getSearchHistoryAsync()
  searchHistoryExecute(
    `{"sort":"sent","order":1,"from":"foo","to":"foo","subject":"foo","allText":"foo"}`
  )
  expect(selectFrom(store.getState())).toEqual('foo')
  expect(selectTo(store.getState())).toEqual('foo')
  expect(selectSubject(store.getState())).toEqual('foo')
  expect(selectAllText(store.getState())).toEqual('foo')
})

test('initial data', () => {
  getInitialDataAsync()
})
