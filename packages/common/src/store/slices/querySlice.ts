/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface QueryState {
  sort: string
  order: number
  sent: string
  from: string
  to: string
  subject: string
  allText: string
  body: string
  emailListPage: number
}
const initialState: QueryState = {
  sort: 'sent',
  order: 1,
  sent: '',
  from: '',
  to: '',
  subject: '',
  allText: '',
  body: '',
  emailListPage: 0,
}

// Actions
export const setSort = createAction<string>('query/setSort')
export const setOrder = createAction<number>('query/setOrder')
export const setSent = createAction<string>('query/setSent')
export const setFrom = createAction<string>('query/setFrom')
export const setTo = createAction<string>('query/setTo')
export const setSubject = createAction<string>('query/setSubject')
export const setAllText = createAction<string>('query/setAllText')
export const setBody = createAction<string>('query/setBody')
export const setEmailListPage = createAction<number>('query/setEmailListPage')
export const clearSearch = createAction<void>('query/clearSearch')

// Reducer
export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSort, (state, action) => {
        state.sort = action.payload
      })
      .addCase(setOrder, (state, action) => {
        state.order = action.payload
      })
      .addCase(setSent, (state, action) => {
        state.sent = action.payload
      })
      .addCase(setFrom, (state, action) => {
        state.from = action.payload
      })
      .addCase(setTo, (state, action) => {
        state.to = action.payload
      })
      .addCase(setSubject, (state, action) => {
        state.subject = action.payload
      })
      .addCase(setAllText, (state, action) => {
        state.allText = action.payload
      })
      .addCase(setBody, (state, action) => {
        state.body = action.payload
      })
      .addCase(setEmailListPage, (state, action) => {
        state.emailListPage = action.payload
      })
      .addCase(clearSearch, (state, action) => {
        state.allText = ''
        state.body = ''
        state.emailListPage = 0
        state.from = ''
        state.order = 1
        state.sort = 'sent'
        state.sent = ''
        state.subject = ''
        state.to = ''
      })
  },
})
export default querySlice.reducer

// selectors & getters
export const selectAllText = (state: RootState): string => state.query.allText
export const selectBody = (state: RootState): string => state.query.body
export const selectEmailListPage = (state: RootState): number =>
  state.query.emailListPage
export const selectFrom = (state: RootState): string => state.query.from
export const selectOrder = (state: RootState): number => state.query.order
export const selectSort = (state: RootState): string => state.query.sort
export const selectSent = (state: RootState): string => state.query.sent
export const selectSubject = (state: RootState): string => state.query.subject
export const selectTo = (state: RootState): string => state.query.to
