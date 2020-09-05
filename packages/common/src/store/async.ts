import AsyncStorage from '@react-native-community/async-storage'
import { emailListPageLength, emailServer } from '../constants'
import {
  appendEmail,
  setContacts,
  setContactsLoading,
  setDarkMode,
  setEmail,
  setEmailLoading,
  setEmailSent,
  setEmailSentLoading,
  setEmailTotal,
  setWordCloud,
  setWordCloudLoading,
  store,
} from './index'

export async function getWordCloudAsync() {
  store.dispatch(setWordCloudLoading(true))
  fetch(`${emailServer}/wordCloud`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setWordCloud(json)))
    .then(() => store.dispatch(setWordCloudLoading(false)))
    .catch((error) => console.error('getWordCloudAsync: ', error))
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

export async function getContactsAsync() {
  store.dispatch(setContactsLoading(true))
  fetch(`${emailServer}/contacts`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setContacts(json)))
    .then(() => store.dispatch(setContactsLoading(false)))
    .catch((error) => console.error('getContactsAsync: ', error))
}

export async function getEmailSentAsync() {
  store.dispatch(setEmailSentLoading(true))
  fetch(`${emailServer}/emailSent`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setEmailSent(json)))
    .then(() => store.dispatch(setEmailSentLoading(false)))
    .catch((error) => console.error('getEmailSentAsync: ', error))
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

export async function getEmailAsync(append: boolean = false) {
  const query = `${emailServer}/${encodeQuery()}`
  console.log(query)
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
    .catch((error) => console.error('getEmailAsync: ', error))
}
