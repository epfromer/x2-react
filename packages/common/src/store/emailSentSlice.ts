import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMAIL_SERVER } from './constants'
import { RootState, store } from './index'
import { EmailSentByDay } from './types'

export interface emailSentState {
  emailSentLoading: boolean
  emailSent: Array<EmailSentByDay> | undefined
}

const initialState: emailSentState = {
  emailSentLoading: false,
  emailSent: undefined,
}

export const emailSentSlice = createSlice({
  name: 'emailSent',
  initialState,
  reducers: {
    setEmailSentLoading: (state, action: PayloadAction<boolean>) => {
      state.emailSentLoading = action.payload
    },
    setEmailSent: (state, action: PayloadAction<Array<EmailSentByDay>>) => {
      state.emailSent = action.payload
    },
  },
})
export default emailSentSlice.reducer
export const { setEmailSentLoading, setEmailSent } = emailSentSlice.actions

// Selectors
export const selectEmailSentLoading = (state: RootState) =>
  state.emailSent.emailSentLoading
export const selectEmailSent = (state: RootState) => state.emailSent.emailSent

// Aync actions
export async function getEmailSentAsync() {
  store.dispatch(setEmailSentLoading(true))
  fetch(`${EMAIL_SERVER}/emailSent`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setEmailSent(json)))
    .then(() => store.dispatch(setEmailSentLoading(false)))
    .catch((error) => console.error('getEmailSentAsync: ', error))
}
