import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import '@testing-library/jest-dom/extend-expect'
import fetchMock from 'jest-fetch-mock'
import {
  clearSearch,
  Email,
  EmailSentByDay,
  getCustodiansAsync,
  getEmailAsync,
  getEmailById,
  getEmailIndex,
  getEmailSentByDayAsync,
  getNextEmailId,
  getPreviousEmailId,
  getWordCloudAsync,
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
  WordCloudTag,
} from '../index'
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

const custodians = [
  {
    id: 'causey',
    name: 'Causey, Richard',
    aliases: [],
    title: 'Executive Vice President and Chief Accounting Officer',
    color: '#673ab7',
    senderTotal: 17,
    receiverTotal: 272,
    toCustodians: [
      {
        emailId: 'dd8b6148-aea3-4d3a-bbda-e539f6c01820',
        custodianIds: ['whalley'],
      },
    ],
    fromCustodians: [],
  },
  {
    id: 'whalley',
    name: 'Whalley, Greg',
    aliases: [],
    title: 'President',
    color: '#3f51b5',
    senderTotal: 19,
    receiverTotal: 466,
    toCustodians: [],
    fromCustodians: [
      {
        emailId: 'dd8b6148-aea3-4d3a-bbda-e539f6c01820',
        custodianId: 'causey',
      },
    ],
  },
]
store.dispatch(setCustodians(custodians))
const wordCloud: Array<WordCloudTag> = [
  {
    tag: 'avici',
    weight: 29,
  },
  {
    tag: 'azurix',
    weight: 490,
  },
]
store.dispatch(setWordCloud(wordCloud))
const emailSentByDay: Array<EmailSentByDay> = [
  {
    sent: '2001-08-28T14:36:52.000Z',
    emailIds: ['5f12fbcdab4d2f1a58edd105'],
  },
  {
    sent: '2001-08-23T15:52:44.000Z',
    emailIds: ['dd8b6148-aea3-4d3a-bbda-e539f6c01820'],
  },
  {
    sent: '2001-10-28T22:00:13.000Z',
    emailIds: ['4f12fbcdab4d2f1a58edd10b'],
  },
]
store.dispatch(setEmailSentByDay(emailSentByDay))
const email: Array<Email> = [
  {
    id: '5f12fbcdab4d2f1a58edd105',
    sent: '2001-08-28T14:36:52.000Z',
    sentShort: '2001-08-28',
    from: 'Symes  Kate',
    fromCustodian: '',
    to: 'DL-Portland Real Time Shift',
    toCustodians: [],
    cc: '',
    bcc: '',
    subject: 'New SWOASIS Login',
    body: 'body 1',
  },
  {
    id: 'dd8b6148-aea3-4d3a-bbda-e539f6c01820',
    sent: '2001-08-23T15:52:44.000Z',
    sentShort: '2001-08-23',
    from: 'Causey  Richard',
    fromCustodian: 'causey',
    to: 'Whalley  Greg; Delainey  David',
    toCustodians: ['whalley'],
    cc: 'Lavorato  John; Buy  Rick',
    bcc: '',
    subject: 'RE: NewPower',
    body: 'body 2',
  },
  {
    id: '4f12fbcdab4d2f1a58edd10b',
    sent: '2001-10-28T22:00:13.000Z',
    sentShort: '2001-08-28',
    from: 'Slinger',
    fromCustodian: '',
    to: 'meyers; Bert',
    toCustodians: [],
    cc: '',
    bcc: '',
    subject: 'FW: websites',
    body: 'body 2',
  },
]
store.dispatch(setEmail(email))
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
  fetchMock.mockResponseOnce(JSON.stringify(wordCloud))
  await getWordCloudAsync()
  expect(store.getState().wordCloud.wordCloud).toEqual(wordCloud)
})

test('getWordCloudAsync', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(custodians))
  await getCustodiansAsync()
  expect(store.getState().custodians.custodians).toEqual(custodians)
})

test('loadAppSettingsAsync', async () => {
  await loadAppSettingsAsync()
  expect(store.getState().appSettings.darkMode).toEqual(false)
})

test('getEmailSentAsync', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(emailSentByDay))
  await getEmailSentByDayAsync()
  expect(store.getState().emailSent.emailSentByDay).toEqual(emailSentByDay)
})

test('getEmailAsync', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(email))
  await getEmailAsync()
  expect(store.getState().email.email).toEqual(email)
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
