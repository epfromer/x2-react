import { gql, request } from 'graphql-request'
import { x2Server } from '../constants'
import {
  clearSearch,
  setAllText,
  setBody,
  setFrom,
  setOrder,
  setSort,
  setSearchHistory,
  setSearchHistoryLoading,
  setSent,
  setSubject,
  setTimeSpan,
  setTo,
  store,
} from './index'

// TODO - move this into history view

export function getSearchHistoryAsync(): void {
  store.dispatch(setSearchHistoryLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = gql`
    {
      getSearchHistory {
        id
        timestamp
        entry
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => {
      store.dispatch(setSearchHistory(data.getSearchHistory))
      store.dispatch(setSearchHistoryLoading(false))
    })
    .catch((err) => console.error('getInitialDataAsync: ', err))
}

export function searchHistoryExecute(search: string): void {
  const o = JSON.parse(search)
  store.dispatch(clearSearch())
  if (o.hasOwnProperty('sort')) store.dispatch(setSort(o.sort))
  if (o.hasOwnProperty('order')) store.dispatch(setOrder(o.order))
  if (o.hasOwnProperty('sent')) store.dispatch(setSent(o.sent))
  if (o.hasOwnProperty('timeSpan')) store.dispatch(setTimeSpan(o.timeSpan))
  if (o.hasOwnProperty('from')) store.dispatch(setFrom(o.from))
  if (o.hasOwnProperty('to')) store.dispatch(setTo(o.to))
  if (o.hasOwnProperty('subject')) store.dispatch(setSubject(o.subject))
  if (o.hasOwnProperty('allText')) store.dispatch(setAllText(o.allText))
  if (o.hasOwnProperty('body')) store.dispatch(setBody(o.body))
}
