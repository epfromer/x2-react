import {
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
} from '@klonzo/common'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import 'jest-canvas-mock'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

// https://testing-library.com/docs/react-testing-library/intro

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
const wordCloud = [
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
const emailSentByDay = [
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
const email = [
  {
    id: '5f12fbcdab4d2f1a58edd105',
    sent: '2001-08-28T14:36:52.000Z',
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

export function renderComp(comp, history = createMemoryHistory()) {
  return render(
    <Router history={history}>
      <Provider store={store}>{comp}</Provider>
    </Router>
  )
}

// mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}
