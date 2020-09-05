import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import {
  setAllText,
  setBody,
  setCustodians,
  setEmail,
  setEmailSent,
  setFrom,
  setSubject,
  setTo,
  setWordCloud,
  store,
} from '@klonzo/common'
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

const custodians = [
  {
    id: '5f1301b1ab4d2f1a58ee5999',
    senderTotal: 5,
    receiverTotal: 34,
    toCustodians: [
      {
        id: '6711b456-d02f-4433-b97f-d06a725846ff',
        to: ['Whalley, Greg', 'Lay, Kenneth'],
        sent: '2001-10-24T22:02:54.000Z',
      },
    ],
    fromCustodians: [],
    name: 'Fastow, Andrew',
    title: 'Chief Financial Officer',
    color: '#e91e63',
    aliases: [],
  },
  {
    id: '5f1301b1ab4d2f1a58ee599b',
    senderTotal: 40,
    receiverTotal: 2745,
    toCustodians: [],
    fromCustodians: [
      {
        id: 'e2c95722-16d8-49e7-8bf3-44cc8352fba9',
        from: 'Skilling, Jeff',
        sent: '2001-08-02T02:25:58.000Z',
      },
      {
        id: 'e2c95722-16d8-49e7-8bf3-44cc8352fba9',
        from: 'Skilling, Jeff',
        sent: '2001-08-02T02:25:58.000Z',
      },
      {
        id: '64aa8fe6-43ca-4325-b218-9e8b2d1d2054',
        from: 'Skilling, Jeff',
        sent: '2001-08-02T03:21:03.000Z',
      },
      {
        id: '64aa8fe6-43ca-4325-b218-9e8b2d1d2054',
        from: 'Skilling, Jeff',
        sent: '2001-08-02T03:21:03.000Z',
      },
      {
        id: '6711b456-d02f-4433-b97f-d06a725846ff',
        from: 'Fastow, Andrew',
        sent: '2001-10-24T22:02:54.000Z',
      },
    ],
    name: 'Lay, Kenneth',
    title: 'Founder, CEO and Chairman',
    color: '#ff9800',
    aliases: [],
  },
]
store.dispatch(setCustodians(custodians))
const wordCloud = [
  {
    id: '5f1301b1ab4d2f1a58ee5d90',
    tag: 'avici',
    weight: 29,
  },
  {
    id: '5f1301b1ab4d2f1a58ee5d91',
    tag: 'azurix',
    weight: 490,
  },
]
store.dispatch(setWordCloud(wordCloud))
const emailSent = [
  {
    id: '5f1301b1ab4d2f1a58ee5d21',
    sent: '1999-01-06',
    ids: ['5f3ca4f5-d3fb-48dd-b2e8-e0dbaab4753f'],
  },
  {
    id: '5f1301b1ab4d2f1a58ee5d23',
    sent: '1999-01-08',
    ids: [
      'bb15e4d9-9f28-4bcc-8cdf-9694033e8e59',
      '2bb04817-3737-46f3-ad9a-3c7cb5af2e35',
    ],
  },
]
store.dispatch(setEmailSent(emailSent))
const email = [
  {
    id: '5f12fbcdab4d2f1a58edd105',
    id: 'fedd603d-9f25-43ef-9906-ac7023a7d6e3',
    sent: '2001-08-28T14:36:52.000Z',
    from: 'Symes  Kate',
    fromCustodian: '',
    to: 'DL-Portland Real Time Shift',
    toCustodian: '',
    cc: '',
    bcc: '',
    subject: 'New SWOASIS Login',
    body: 'body 1',
  },
  {
    id: '5f12fbcdab4d2f1a58edd10b',
    id: '41cf2a86-6c81-4441-8704-b54e2da03f20',
    sent: '2001-10-28T22:00:13.000Z',
    from: 'Slinger',
    fromCustodian: '',
    to: 'meyers; Bert',
    toCustodian: '',
    cc: '',
    bcc: '',
    subject: 'FW: websites',
    body: 'body 2',
  },
  {
    id: '4f12fbcdab4d2f1a58edd10b',
    id: '41cf2a86-6c81-4441-8704-c54e2da03f20',
    sent: '2001-10-28T22:00:13.000Z',
    from: 'Slinger',
    fromCustodian: '',
    to: 'meyers; Bert',
    toCustodian: '',
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

export function renderComp(comp) {
  return render(<Provider store={store}>{comp}</Provider>)
}

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
