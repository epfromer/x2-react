import { createAction, createSlice } from '@reduxjs/toolkit'

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

export const setSort = createAction<string>('query/setSort')
export const setOrder = createAction<number>('query/setOrder')
export const setSent = createAction<string>('query/setSent')
export const setTimeSpan = createAction<number>('query/setTimeSpan')
export const setFrom = createAction<string>('query/setFrom')
export const setTo = createAction<string>('query/setTo')
export const setSubject = createAction<string>('query/setSubject')
export const setAllText = createAction<string>('query/setAllText')
export const setBody = createAction<string>('query/setBody')
export const setEmailListPage = createAction<number>('query/setEmailListPage')
export const clearSearch = createAction<void>('query/clearSearch')

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
      .addCase(setTimeSpan, (state, action) => {
        state.timeSpan = action.payload
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
        state.timeSpan = 0
        state.to = ''
      })
  },
})
export default querySlice.reducer
