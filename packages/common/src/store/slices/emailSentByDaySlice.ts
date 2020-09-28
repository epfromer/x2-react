import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmailSentByDay } from '../types'

export interface EmailSentByDayState {
  emailSentByDayLoading: boolean
  emailSentByDay: Array<EmailSentByDay> | undefined
}

const initialState: EmailSentByDayState = {
  emailSentByDayLoading: false,
  emailSentByDay: undefined,
}

export const emailSentByDaySlice = createSlice({
  name: 'emailSentByDay',
  initialState,
  reducers: {
    setEmailSentByDayLoading: (state, action: PayloadAction<boolean>) => {
      state.emailSentByDayLoading = action.payload
    },
    setEmailSentByDay: (
      state,
      action: PayloadAction<Array<EmailSentByDay>>
    ) => {
      state.emailSentByDay = action.payload
    },
  },
})
export default emailSentByDaySlice.reducer
export const {
  setEmailSentByDayLoading,
  setEmailSentByDay,
} = emailSentByDaySlice.actions

// Selectors
export const selectEmailSentByDayLoading = (state) =>
  state.emailSent.emailSentByDayLoading
export const selectEmailSentByDay = (state) => state.emailSent.emailSentByDay
