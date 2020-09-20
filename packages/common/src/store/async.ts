import AsyncStorage from '@react-native-community/async-storage'
import { emailListPageLength, x2Server } from '../constants'
import { request, gql } from 'graphql-request'
import {
  appendEmail,
  setCustodians,
  setCustodiansLoading,
  setDarkMode,
  setEmail,
  setEmailLoading,
  setEmailSentByDay,
  setEmailSentByDayLoading,
  setEmailTotal,
  setImportLog,
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
      wordcloud {
        tag
        weight
      }
      emailsentbyday {
        emailIds
        sent
      }
      custodians {
        id
        name
        title
        color
        senderTotal
        receiverTotal
        toCustodians {
          emailId
        }
        fromCustodians {
          emailId
          custodianId
        }
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => {
      store.dispatch(setWordCloud(data.wordcloud))
      store.dispatch(setEmailSentByDay(data.emailsentbyday))
      store.dispatch(setCustodians(data.custodians))
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
  fetch(`${server}/custodians`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setCustodians(json)))
    .then(() => store.dispatch(setCustodiansLoading(false)))
    .catch((err) => console.error('getCustodiansAsync: ', err))
}

function makeQueryObj(): any {
  const state = store.getState()
  const query: any = {
    skip: state.query.emailListPage * emailListPageLength,
    limit: emailListPageLength,
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

function encodeQuery() {
  // encode query for URL
  let queryString = ''
  const query = makeQueryObj()

  // encode into URL friendly string
  let params = ''
  Object.keys(query).forEach((key) => {
    if (
      (typeof query[key] === 'string' && query[key]) ||
      typeof query[key] === 'number'
    ) {
      params += '&' + key + '=' + encodeURIComponent(query[key])
    }
  })
  queryString = 'email/?' + params.slice(1)
  return queryString
}

export function getEmailAsync(append: boolean = false) {
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = `${server}/${encodeQuery()}`
  // console.log(query)
  store.dispatch(setEmailLoading(true))
  fetch(query)
    .then((resp) => resp.json())
    .then((json) => {
      if (append) {
        store.dispatch(appendEmail(json.emails))
      } else {
        store.dispatch(setEmail(json.emails))
      }
      store.dispatch(setEmailTotal(json.total))
    })
    .then(() => store.dispatch(setEmailLoading(false)))
    .catch((err) => console.error('getEmailAsync: ', err))
}

let importTimer
function getImportStatusInterval() {
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  fetch(`${server}/importstatus/`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setImportLog(json)))
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
