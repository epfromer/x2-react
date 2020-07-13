import _ from 'lodash'
import store from './'
import { Email, RootState } from './types'
import { REACT_APP_EMAIL_SERVER } from './env'

// actions, aka async mutations

// set any redux state element
export const setReduxState = (k: string, v: string | boolean | number) => ({
  type: 'setReduxState',
  key: k,
  value: v,
})

export const appendEmails = (k: string, v: Array<Email>) => ({
  type: 'appendEmails',
  value: v,
})

export const clearSearch = () => ({ type: 'clearSearch' })

export const saveAppSettings = () => ({ type: 'saveAppSettings' })

function makeQueryObj(): any {
  const state: RootState = store.getState()
  const query: any = {
    skip: state.emailListPage * state.emailListItemsPerPage,
    limit: state.emailListItemsPerPage,
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
  store.dispatch(setReduxState(loadingIndicator, true))
  const url = `${REACT_APP_EMAIL_SERVER}/${encodeQuery(stat)}`
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
        store.dispatch({
          type: 'setReduxState',
          key: 'totalEmails',
          value: json.total,
        })
      } else {
        store.dispatch(setReduxState(stat, json))
      }
    })
    .then(() => store.dispatch(setReduxState(loadingIndicator, false)))
    .catch((error) => {
      console.error('fetch error', error)
    })
}
