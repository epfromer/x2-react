import { createAction, createSlice, Store } from '@reduxjs/toolkit'
import request, { gql } from 'graphql-request'
import { RootState } from '..'
import { defaultLimit, x2Server } from '../../constants'
import { Email } from '../types'

export interface EmailState {
  emailLoading: boolean
  email: Array<Email> | undefined
  emailTotal: number
}
const initialState: EmailState = {
  emailLoading: false,
  email: undefined,
  emailTotal: 0,
}

// Actions
export const setEmailLoading = createAction<boolean>('email/setEmailLoading')
export const setEmail = createAction<Array<Email>>('email/setEmail')
export const appendEmail = createAction<Array<Email>>('email/appendEmail')
export const setEmailTotal = createAction<number>('email/setEmailTotal')

// Reducer
export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setEmailLoading, (state, action) => {
        state.emailLoading = action.payload
      })
      .addCase(setEmail, (state, action) => {
        // console.log('setting email')
        state.email = action.payload
      })
      .addCase(appendEmail, (state, action) => {
        if (state.email) {
          // console.log('appending email')
          state.email.push(...action.payload)
        } else {
          // console.log('setting email')
          state.email = action.payload
        }
      })
      .addCase(setEmailTotal, (state, action) => {
        state.emailTotal = action.payload
      })
  },
})
export default emailSlice.reducer

// selectors & getters
export const getEmailLoading = (state: RootState): boolean =>
  state.email.emailLoading
export const getEmail = (state: RootState): Array<Email> | undefined =>
  state.email.email
export const getEmailTotal = (state: RootState): number =>
  state.email.emailTotal

// graphQl query
function getQueryObj(store: Store): unknown {
  const state = store.getState()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {
    skip: state.query.emailListPage * defaultLimit,
    limit: defaultLimit,
    sort: state.query.sort,
    order: state.query.order,
  }
  if (state.query.sent) query.sent = state.query.sent
  if (state.query.from) query.from = state.query.from
  if (state.query.to) query.to = state.query.to
  if (state.query.subject) query.subject = state.query.subject
  if (state.query.allText) query.allText = state.query.allText
  if (state.query.body) query.body = state.query.body
  return query
}

export function getEmailAsync(store: Store, append = false): void {
  store.dispatch(setEmailLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  // console.log(server)
  const query = gql`
    query getEmail(
      $skip: Int
      $limit: Int
      $sort: String
      $order: Int
      $sent: String
      $from: String
      $to: String
      $subject: String
      $allText: String
      $body: String
    ) {
      getEmail(
        skip: $skip
        limit: $limit
        sort: $sort
        order: $order
        sent: $sent
        from: $from
        to: $to
        subject: $subject
        allText: $allText
        body: $body
      ) {
        emails {
          id
          sent
          sentShort
          from
          fromCustodian
          to
          toCustodians
          cc
          bcc
          subject
          body
        }
        total
      }
    }
  `
  request(`${server}/graphql/`, query, getQueryObj(store))
    .then((data) => {
      if (append) {
        store.dispatch(appendEmail(data.getEmail.emails))
      } else {
        store.dispatch(setEmail(data.getEmail.emails))
      }
      store.dispatch(setEmailTotal(data.getEmail.total))
      store.dispatch(setEmailLoading(false))
    })
    .catch((e) => console.error(e))
}

export const getEmailById = (store: Store, id: string): Email | undefined => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  return state.email.email.find((e: Email) => e.id === id)
}

export const getNextEmailId = (
  store: Store,
  id: string
): string | undefined => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  const i = state.email.email.findIndex((e: Email) => e.id === id)
  return i < state.email.email.length - 1
    ? state.email.email[i + 1].id
    : undefined
}

export const getPreviousEmailId = (
  store: Store,
  id: string
): string | undefined => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  const i = state.email.email.findIndex((e: Email) => e.id === id)
  return i > 0 ? state.email.email[i - 1].id : undefined
}

export const getEmailIndex = (store: Store, id: string): number | undefined => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  return state.email.email.findIndex((e: Email) => e.id === id) + 1
}

export const getDateStr = (date: Date): string => {
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}
