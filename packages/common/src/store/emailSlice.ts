import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMAIL_SERVER } from './constants'
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
    setEmailTotal: (state, action: PayloadAction<number>) => {
      state.emailTotal = action.payload
    },
  },
})
export default emailSlice.reducer
export const { setEmailLoading, setEmail, setEmailTotal } = emailSlice.actions

// Selectors
export const selectEmailLoading = (state: RootState) => state.email.emailLoading
export const selectEmail = (state: RootState) => state.email.email
export const selectEmailTotal = (state: RootState) => state.email.emailTotal

//     case 'appendEmails': {
//       const s: RootState = _.cloneDeep(state)
//       action.value.map((email: Email) => s.emails.push({ ...email }))
//       return s
//     }

// Aync actions
export async function getEmailAsync() {
  store.dispatch(setEmailLoading(true))
  fetch(`${EMAIL_SERVER}/email`)
    .then((resp) => resp.json())
    .then((json) => {
      // TODO - cache
      store.dispatch(setEmail(json.emails))
      store.dispatch(setEmailTotal(json.total))
    })
    .then(() => store.dispatch(setEmailLoading(false)))
    .catch((error) => console.error('getEmailAsync: ', error))
}
