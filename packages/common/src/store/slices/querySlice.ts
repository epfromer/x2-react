import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

export interface QueryState {
  sort: string
  order: number
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
  sort: 'sent',
  order: 1,
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
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
    },
    setOrder: (state, action: PayloadAction<number>) => {
      state.order = action.payload
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
      state.allText = ''
      state.body = ''
      state.emailListPage = 0
      state.from = ''
      state.order = 1
      state.sort = 'sent'
      state.sent = ''
      state.subject = ''
      state.timeSpan = 0
      state.to = ''
    },
  },
})
export default querySlice.reducer
export const {
  clearSearch,
  setAllText,
  setBody,
  setEmailListPage,
  setFrom,
  setOrder,
  setSort,
  setSent,
  setSubject,
  setTimeSpan,
  setTo,
} = querySlice.actions

// Selectors
export const selectAllText = (state: RootState) => state.query.allText
export const selectBody = (state: RootState) => state.query.body
export const selectEmailListPage = (state: RootState) =>
  state.query.emailListPage
export const selectFrom = (state: RootState) => state.query.from
export const selectOrder = (state: RootState) => state.query.order
export const selectSort = (state: RootState) => state.query.sort
export const selectSent = (state: RootState) => state.query.sent
export const selectSubject = (state: RootState) => state.query.subject
export const selectTimeSpan = (state: RootState) => state.query.timeSpan
export const selectTo = (state: RootState) => state.query.to
