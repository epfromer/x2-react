import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { CachedQuery } from './types'

export interface QueryState {
  cachedQuery: CachedQuery | undefined
  querySort: string
  queryOrder: number
  sent: string
  timeSpan: number
  from: string
  to: string
  subject: string
  allText: string
  body: string
  emailListPage: number
}

const initialState: QueryState = {
  cachedQuery: undefined,
  querySort: 'sent',
  queryOrder: 1,
  sent: '',
  timeSpan: 0,
  from: '',
  to: '',
  subject: '',
  allText: '',
  body: '',
  emailListPage: 0,
}

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCachedQuery: (state, action: PayloadAction<CachedQuery>) => {
      state.cachedQuery = action.payload
    },
    setQuerySort: (state, action: PayloadAction<string>) => {
      state.querySort = action.payload
    },
    setQueryOrder: (state, action: PayloadAction<number>) => {
      state.queryOrder = action.payload
    },
    setSent: (state, action: PayloadAction<string>) => {
      state.sent = action.payload
    },
    setTimeSpan: (state, action: PayloadAction<number>) => {
      state.timeSpan = action.payload
    },
    setFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload
    },
    setTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload
    },
    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload
    },
    setAllText: (state, action: PayloadAction<string>) => {
      state.allText = action.payload
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload
    },
    setEmailListPage: (state, action: PayloadAction<number>) => {
      state.emailListPage = action.payload
    },
    clearSearch: (state) => {
      state.emailListPage = 0
      state.querySort = 'sent'
      state.queryOrder = 1
      state.sent = ''
      state.timeSpan = 0
      state.from = ''
      state.to = ''
      state.subject = ''
      state.allText = ''
      state.body = ''
    },
  },
})
export default querySlice.reducer
export const {
  setCachedQuery,
  setQuerySort,
  setQueryOrder,
  setSent,
  setTimeSpan,
  setFrom,
  setTo,
  setSubject,
  setAllText,
  setBody,
  setEmailListPage,
  clearSearch,
} = querySlice.actions

// Selectors
// TODO
export const selectCachedQuery = (state: RootState) => state.query.cachedQuery
export const selectQuerySort = (state: RootState) => state.query.querySort
export const selectQueryOrder = (state: RootState) => state.query.queryOrder
export const selectSent = (state: RootState) => state.query.sent
export const selectTimeSpan = (state: RootState) => state.query.timeSpan
export const selectFrom = (state: RootState) => state.query.from
export const selectTo = (state: RootState) => state.query.to
export const selectSubject = (state: RootState) => state.query.subject
export const selectAllText = (state: RootState) => state.query.allText
export const selectBody = (state: RootState) => state.query.body
export const selectEmailListPage = (state: RootState) =>
  state.query.emailListPage
