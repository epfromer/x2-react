import AsyncStorage from '@react-native-community/async-storage'
import { gql, request } from 'graphql-request'
import { defaultLimit, x2Server } from '../constants'
import {
  appendEmail,
  setAuthenticated,
  setCustodians,
  setCustodiansLoading,
  setDarkMode,
  setEmail,
  setEmailLoading,
  setEmailSentByDay,
  setEmailSentByDayLoading,
  setEmailTotal,
  setImportLog,
  setUsername,
  setWordCloud,
  setWordCloudLoading,
  store,
} from './index'

export function getInitialDataAsync() {
  store.dispatch(setWordCloudLoading(true))
  store.dispatch(setEmailSentByDayLoading(true))
  store.dispatch(setCustodiansLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = gql`
    {
      getWordCloud {
        tag
        weight
      }
      getEmailSentByDay {
        sent
        total
      }
      getCustodians {
        id
        name
        title
        color
        senderTotal
        receiverTotal
        toCustodians {
          custodianId
          total
        }
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => {
      if (
        !data.getWordCloud ||
        !data.getEmailSentByDay ||
        !data.getCustodians
      ) {
        console.error('x2 server returns null data')
      }
      store.dispatch(setWordCloud(data.getWordCloud))
      store.dispatch(setEmailSentByDay(data.getEmailSentByDay))
      store.dispatch(setCustodians(data.getCustodians))
    })
    .then(() => {
      store.dispatch(setWordCloudLoading(false))
      store.dispatch(setEmailSentByDayLoading(false))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((err) => console.error('getInitialDataAsync: ', err))
}

export async function loadAppSettingsAsync() {
  try {
    let darkMode = false
    if (typeof Storage !== 'undefined') {
      darkMode = localStorage.getItem('darkMode') === 'true' ? true : false
    } else {
      let value = await AsyncStorage.getItem('darkMode')
      if (value !== null) {
        darkMode = value === 'true' ? true : false
      }
    }
    store.dispatch(setDarkMode(darkMode))
  } catch (e) {
    console.error(e)
  }
}

export function getCustodiansAsync() {
  store.dispatch(setCustodiansLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = gql`
    {
      getCustodians {
        id
        name
        title
        color
        senderTotal
        receiverTotal
        toCustodians {
          custodianId
          total
        }
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => {
      if (!data.getCustodians) console.error('x2 server returns null data')
      store.dispatch(setCustodians(data.getCustodians))
    })
    .then(() => store.dispatch(setCustodiansLoading(false)))
    .catch((err) => console.error('getCustodiansAsync: ', err))
}

function makeQueryObj(): any {
  const state = store.getState()
  const query: any = {
    skip: state.query.emailListPage * defaultLimit,
    limit: defaultLimit,
    sort: state.query.querySort,
    order: state.query.queryOrder,
  }
  if (state.query.sent) query.sent = state.query.sent
  if (state.query.timeSpan) query.timeSpan = state.query.timeSpan
  if (state.query.from) query.from = state.query.from
  if (state.query.to) query.to = state.query.to
  if (state.query.subject) query.subject = state.query.subject
  if (state.query.allText) query.allText = state.query.allText
  if (state.query.body) query.body = state.query.body
  return query
}

export function getEmailAsync(append: boolean = false) {
  store.dispatch(setEmailLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  // console.log(server)
  const query = gql`
    query getEmail(
      $skip: Int
      $limit: Int
      $sort: String
      $order: Int
      $sent: String
      $timeSpan: Int
      $from: String
      $to: String
      $subject: String
      $allText: String
      $body: String
    ) {
      getEmail(
        skip: $skip
        limit: $limit
        sort: $sort
        order: $order
        sent: $sent
        timeSpan: $timeSpan
        from: $from
        to: $to
        subject: $subject
        allText: $allText
        body: $body
      ) {
        emails {
          id
          sent
          sentShort
          from
          fromCustodian
          to
          toCustodians
          cc
          bcc
          subject
          body
        }
        total
      }
    }
  `
  request(`${server}/graphql/`, query, makeQueryObj())
    .then((data) => {
      if (append) {
        store.dispatch(appendEmail(data.getEmail.emails))
      } else {
        store.dispatch(setEmail(data.getEmail.emails))
      }
      store.dispatch(setEmailTotal(data.getEmail.total))
    })
    .then(() => store.dispatch(setEmailLoading(false)))
    .catch((err) => console.error('getEmailAsync: ', err))
}

let importTimer
function getImportStatusInterval() {
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = gql`
    {
      getImportStatus {
        id
        timestamp
        entry
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => {
      if (!data.getImportStatus) {
        console.error('getImportStatusInterval: x2 server returns null data')
      }
      store.dispatch(setImportLog(data.getImportStatus))
    })
    .catch((err) => console.error('getImportStatusInterval: ', err))
}
export function getImportStatus() {
  if (importTimer) return
  importTimer = setInterval(getImportStatusInterval, 2000)
}
export function stopImportStatusInterval() {
  if (!importTimer) return
  clearInterval(importTimer)
  importTimer = undefined
}

export function authenticate(username: string, password: string): boolean {
  // connect to some authentication service?
  const isAuthenticated = password === 'foo'
  if (isAuthenticated) {
    store.dispatch(setAuthenticated(true))
    store.dispatch(setUsername(username))
  }
  return isAuthenticated
}

export function signOut() {
  store.dispatch(setAuthenticated(false))
  store.dispatch(setUsername(''))
}
