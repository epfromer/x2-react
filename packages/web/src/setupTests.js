import {
  setAllText,
  setBody,
  setEmail,
  setFrom,
  setSubject,
  setTo,
  store,
  setContacts,
} from '@klonzo/common'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import 'jest-canvas-mock'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

// https://testing-library.com/docs/vue-testing-library/intro

const contacts = [
  {
    _id: '5f1301b1ab4d2f1a58ee5999',
    senderTotal: 5,
    receiverTotal: 34,
    asSender: [
      {
        id: '6711b456-d02f-4433-b97f-d06a725846ff',
        to: ['Whalley, Greg', 'Lay, Kenneth'],
        sent: '2001-10-24T22:02:54.000Z',
      },
    ],
    asReceiver: [],
    name: 'Fastow, Andrew',
    title: 'Chief Financial Officer',
    color: '#e91e63',
    aliases: [],
  },
  {
    _id: '5f1301b1ab4d2f1a58ee599b',
    senderTotal: 40,
    receiverTotal: 2745,
    asSender: [],
    asReceiver: [
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
store.dispatch(setContacts(contacts))
const email = [
  {
    _id: '5f12fbcdab4d2f1a58edd105',
    id: 'fedd603d-9f25-43ef-9906-ac7023a7d6e3',
    sent: '2001-08-28T14:36:52.000Z',
    from: 'Symes  Kate',
    fromContact: '',
    to: 'DL-Portland Real Time Shift',
    toContact: '',
    cc: '',
    bcc: '',
    subject: 'New SWOASIS Login',
    body: 'body 1',
  },
  {
    _id: '5f12fbcdab4d2f1a58edd10b',
    id: '41cf2a86-6c81-4441-8704-b54e2da03f20',
    sent: '2001-10-28T22:00:13.000Z',
    from: 'Slinger',
    fromContact: '',
    to: 'meyers; Bert',
    toContact: '',
    cc: '',
    bcc: '',
    subject: 'FW: websites',
    body: 'body 2',
  },
  {
    _id: '4f12fbcdab4d2f1a58edd10b',
    id: '41cf2a86-6c81-4441-8704-b54e2da03f20',
    sent: '2001-10-28T22:00:13.000Z',
    from: 'Slinger',
    fromContact: '',
    to: 'meyers; Bert',
    toContact: '',
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
