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
    id: 'fastow',
    name: 'Fastow, Andrew',
    title: 'Chief Financial Officer',
    color: '#e91e63',
    senderTotal: 5,
    receiverTotal: 34,
    toCustodians: [
      {
        emailId: 'e9ffa816-c8e9-45d4-8b59-b3f8f64a0f98',
        custodianIds: ['lay'],
      },
    ],
    fromCustodians: [
      {
        emailId: '6d55bb5e-e8d7-43d4-95b5-ad6ab1c8b8dc',
        custodianId: 'fastow',
      },
    ],
  },
  {
    id: 'lay',
    name: 'Lay, Kenneth',
    title: 'Founder, CEO and Chairman',
    color: '#ffff00',
    senderTotal: 40,
    receiverTotal: 2690,
    toCustodians: [
      {
        emailId: '6d55bb5e-e8d7-43d4-95b5-ad6ab1c8b8dc',
        custodianIds: ['fastow'],
      },
    ],
    fromCustodians: [
      {
        emailId: 'e9ffa816-c8e9-45d4-8b59-b3f8f64a0f98',
        custodianId: 'fastow',
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
    sent: '1999-01-06',
    emailIds: ['156f2431-d496-4c5f-832c-c2ea8af75d1c'],
  },
  {
    sent: '1999-01-08',
    emailIds: [
      'bcb82244-1113-4d31-a992-e790c37b6e97',
      'e545749b-4f9f-43ef-8781-592e06aeb69e',
    ],
  },
  {
    sent: '1999-01-09',
    emailIds: ['a5880429-906f-4cd4-8a22-849722e44445'],
  },
]
store.dispatch(setEmailSentByDay(emailSentByDay))
const email = [
  {
    id: '692fbb3b-1a4d-4c5b-b8c2-42034586cc56',
    sent: '2001-08-02T02:25:58.000Z',
    sentShort: '2001-08-02',
    from: 'Skilling',
    fromCustodian: 'skilling',
    to: 'allen; Phillip K.; bay; Frank',
    toCustodians: ['lay'],
    cc: 'lay; Kenneth; patrick; Christie',
    bcc: '',
    subject: 'Please Plan to Attend',
    body: 'body 1',
  },
  {
    id: 'f3281cc4-90a9-4dcb-86bd-d705fc847985',
    sent: '2001-08-02T03:21:03.000Z',
    sentShort: '2001-08-02',
    from: 'Skilling',
    fromCustodian: 'skilling',
    to: 'skilling; Jeff; allen; phillip k.',
    toCustodians: ['skilling', 'lay'],
    cc: 'lay; Kenneth; patrick; Christie',
    bcc: '',
    body: 'body 2',
  },
  {
    id: '5cac6ca4-01e7-4de5-a1d4-806b860e104d',
    sent: '2001-10-12T20:05:56.000Z',
    sentShort: '2001-10-12',
    from: 'Fleming',
    fromCustodian: 'fleming',
    to: 'lay; Kenneth; Amy Taylor (E-mail)',
    toCustodians: ['lay'],
    cc: '',
    bcc: '',
    subject: 'Check out this cool game!',
    body: 'body 3',
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
