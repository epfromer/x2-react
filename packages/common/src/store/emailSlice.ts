import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMAIL_LIST_PAGE_LENGTH, EMAIL_SERVER } from './constants'
import { RootState, store } from './index'
import { Email } from './types'

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

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmailLoading: (state, action: PayloadAction<boolean>) => {
      state.emailLoading = action.payload
    },
    setEmail: (state, action: PayloadAction<Array<Email>>) => {
      state.email = action.payload
    },
    appendEmail: (state, action: PayloadAction<Array<Email>>) => {
      if (state.email) {
        console.log('appending email')
        state.email.push(...action.payload)
      } else {
        console.log('setting email')
        state.email = action.payload
      }
    },
    setEmailTotal: (state, action: PayloadAction<number>) => {
      state.emailTotal = action.payload
    },
  },
})
export default emailSlice.reducer
export const {
  appendEmail,
  setEmail,
  setEmailLoading,
  setEmailTotal,
} = emailSlice.actions

// Selectors
export const selectEmailLoading = (state: RootState) => state.email.emailLoading
export const selectEmail = (state: RootState) => state.email.email
export const selectEmailTotal = (state: RootState) => state.email.emailTotal

// Getters
export const getEmailById = (id: string) => {
  const state: RootState = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  return state.email.email.find((e: Email) => e._id === id)
}
export const getNextEmailId = (id: string) => {
  const state: RootState = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  const i = state.email.email.findIndex((e: Email) => e._id === id)
  return i < state.email.email.length - 1
    ? state.email.email[i + 1]._id
    : undefined
}
export const getPreviousEmailId = (id: string) => {
  const state: RootState = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  const i = state.email.email.findIndex((e: Email) => e._id === id)
  return i > 0 ? state.email.email[i - 1]._id : undefined
}
export const getEmailIndex = (id: string) => {
  const state: RootState = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  return state.email.email.findIndex((e: Email) => e._id === id) + 1
}

//TODO
//     case 'appendEmails': {
//       const s: RootState = _.cloneDeep(state)
//       action.value.map((email: Email) => s.emails.push({ ...email }))
//       return s
//     }

function makeQueryObj(): any {
  const state: RootState = store.getState()
  const query: any = {
    skip: state.query.emailListPage * EMAIL_LIST_PAGE_LENGTH,
    limit: EMAIL_LIST_PAGE_LENGTH,
    sort: state.query.querySort,
    order: state.query.queryOrder,
  }
  if (state.query.sent) query.sent = state.query.sent
  if (state.query.timeSpan) query.timeSpan = state.query.timeSpan
  if (state.query.from) query.from = state.query.from
  if (state.query.to) query.to = state.query.to
  if (state.query.subject) query.subject = state.query.subject
  if (state.query.allText) query.allText = state.query.allText
  if (state.query.body) query.body = state.query.body
  return query
}

function encodeQuery() {
  // encode query for URL
  let queryString = ''
  const query = makeQueryObj()

  // // store this away for cache comparisons
  // store.dispatch({
  //   type: 'setReduxState',
  //   key: 'cachedQuery',
  //   value: query,
  // })

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
  return queryString
}

// Aync actions
export async function getEmailAsync(append: boolean = false) {
  store.dispatch(setEmailLoading(true))
  const query = `${EMAIL_SERVER}/${encodeQuery()}`
  console.log(query)
  fetch(query)
    .then((resp) => resp.json())
    .then((json) => {
      // TODO - cache
      if (append) {
        store.dispatch(appendEmail(json.emails))
      } else {
        store.dispatch(setEmail(json.emails))
      }
      store.dispatch(setEmailTotal(json.total))
    })
    .then(() => store.dispatch(setEmailLoading(false)))
    .catch((error) => console.error('getEmailAsync: ', error))
}
