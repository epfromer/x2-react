import { createAction, createSlice, Store } from '@reduxjs/toolkit'
import request, { gql } from 'graphql-request'
import { RootState } from '..'
import { x2Server } from '../../constants'
import { SearchHistoryEntry } from '../types'
import {
  clearSearch,
  setAllText,
  setBody,
  setFrom,
  setOrder,
  setSent,
  setSort,
  setSubject,
  setTo,
} from './querySlice'

export interface searchHistoryState {
  searchHistoryLoading: boolean
  searchHistory: Array<SearchHistoryEntry> | undefined
}
const initialState: searchHistoryState = {
  searchHistoryLoading: false,
  searchHistory: undefined,
}

// Actions
export const setSearchHistoryLoading = createAction<boolean>(
  'searchHistory/setSearchHistoryLoading'
)
export const setSearchHistory = createAction<Array<SearchHistoryEntry>>(
  'searchHistory/setSearchHistory'
)

// Reducer
export const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSearchHistoryLoading, (state, action) => {
        state.searchHistoryLoading = action.payload
      })
      .addCase(setSearchHistory, (state, action) => {
        state.searchHistory = action.payload
      })
  },
})
export default searchHistorySlice.reducer

// selectors & getters
export const selectSearchHistoryLoading = (state: RootState): boolean =>
  state.searchHistory.searchHistoryLoading
export const selectSearchHistory = (
  state: RootState
): Array<SearchHistoryEntry> | undefined => state.searchHistory.searchHistory

export function getSearchHistoryAsync(store: Store): void {
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
    .catch((e) => console.error(e))
}

export function searchHistoryExecute(store: Store, search: string): void {
  const o = JSON.parse(search)
  store.dispatch(clearSearch())
  if (o.hasOwnProperty('sort')) store.dispatch(setSort(o.sort))
  if (o.hasOwnProperty('order')) store.dispatch(setOrder(o.order))
  if (o.hasOwnProperty('sent')) store.dispatch(setSent(o.sent))
  if (o.hasOwnProperty('from')) store.dispatch(setFrom(o.from))
  if (o.hasOwnProperty('to')) store.dispatch(setTo(o.to))
  if (o.hasOwnProperty('subject')) store.dispatch(setSubject(o.subject))
  if (o.hasOwnProperty('allText')) store.dispatch(setAllText(o.allText))
  if (o.hasOwnProperty('body')) store.dispatch(setBody(o.body))
}
