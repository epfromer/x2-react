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
export const getAllText = (state: RootState): string => state.query.allText
export const getBody = (state: RootState): string => state.query.body
export const getEmailListPage = (state: RootState): number =>
  state.query.emailListPage
export const getFrom = (state: RootState): string => state.query.from
export const getOrder = (state: RootState): number => state.query.order
export const getSort = (state: RootState): string => state.query.sort
export const getSent = (state: RootState): string => state.query.sent
export const getSubject = (state: RootState): string => state.query.subject
export const getTo = (state: RootState): string => state.query.to
// TODO merge with getQueryObj
export const getQuery = (state: RootState): QueryState => ({
  allText: state.query.allText,
  body: state.query.body,
  emailListPage: state.query.emailListPage,
  from: state.query.from,
  order: state.query.order,
  sent: state.query.sent,
  sort: state.query.sort,
  subject: state.query.subject,
  to: state.query.to,
})
