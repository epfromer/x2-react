import AsyncStorage from '@react-native-community/async-storage'
import { EMAIL_LIST_PAGE_LENGTH, EMAIL_SERVER } from '@x2react/shared'
import _ from 'lodash'
import { store } from './'
import { Email, RootState } from './types'

// actions, aka async mutations

export const setReduxState = (k: string, v: string | boolean | number) =>
  store.dispatch({
    type: 'setReduxState',
    key: k,
    value: v,
  })

export const appendEmails = (k: string, v: Array<Email>) =>
  store.dispatch({
    type: 'appendEmails',
    key: '',
    value: v,
  })

export const clearSearch = () =>
  store.dispatch({ type: 'clearSearch', key: '', value: '' })

export const saveAppSettings = () =>
  store.dispatch({ type: 'saveAppSettings', key: '', value: '' })

function makeQueryObj(): any {
  const state: RootState = store.getState()
  const query: any = {
    skip: state.emailListPage * EMAIL_LIST_PAGE_LENGTH,
    limit: EMAIL_LIST_PAGE_LENGTH,
    sort: state.querySort,
    order: state.queryOrder,
  }
  if (state.sent) query.sent = state.sent
  if (state.timeSpan) query.timeSpan = state.timeSpan
  if (state.from) query.from = state.from
  if (state.to) query.to = state.to
  if (state.subject) query.subject = state.subject
  if (state.allText) query.allText = state.allText
  if (state.body) query.body = state.body
  return query
}

function encodeQuery(stat: string) {
  // encode query for URL
  let queryString = ''
  if (stat === 'emails') {
    // a query string with params
    const query = makeQueryObj()

    // store this away for cache comparisons
    store.dispatch({
      type: 'setReduxState',
      key: 'cachedQuery',
      value: query,
    })

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
  } else {
    // simply the name of the stat
    queryString = stat
  }
  return queryString
}

function cacheValid(stat: string): boolean {
  const state: RootState = store.getState()
  if (stat === 'emails') {
    if (state.cachedQuery) {
      return _.isEqual(makeQueryObj(), state.cachedQuery)
    }
  } else {
    // TODO key
    // @ts-ignore
    if (state[stat] || state[stat + 'Loading']) return true
  }
  return false
}

export function fetchAndCache(
  stat: string,
  invalidateCache: boolean = false,
  append: boolean = false
) {
  if (!invalidateCache && cacheValid(stat)) {
    // console.log('cache hit')
    return
  } else {
    // console.log('cache miss')
  }
  const loadingIndicator = stat + 'Loading'
  setReduxState(loadingIndicator, true)
  const url = `${EMAIL_SERVER}/${encodeQuery(stat)}`
  console.log(url)
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      if (stat === 'emails') {
        store.dispatch({
          type: append ? 'appendEmails' : 'setReduxState',
          key: 'emails',
          value: json.emails.map((email: Email) => ({
            ...email,
            sent: email.sent.slice(0, 10) + ' ' + email.sent.slice(11, 19),
          })),
        })
        setReduxState('totalEmails', json.total)
      } else {
        setReduxState(stat, json)
      }
    })
    .then(() => setReduxState(loadingIndicator, false))
    .catch((error) => {
      console.error('fetch error', error)
    })
}

export async function getLocalStorage() {
  try {
    let value = await AsyncStorage.getItem('darkMode')
    if (value !== null) {
      setReduxState('darkMode', value === 'true' ? true : false)
    }
  } catch (e) {
    console.error(e)
  }
}
