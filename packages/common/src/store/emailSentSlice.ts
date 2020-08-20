import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
export const selectEmailSentLoading = (state) =>
  state.emailSent.emailSentLoading
export const selectEmailSent = (state) => state.emailSent.emailSent
