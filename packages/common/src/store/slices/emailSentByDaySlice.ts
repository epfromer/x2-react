import { createAction, createSlice } from '@reduxjs/toolkit'
import { EmailSentByDay } from '../types'

export interface EmailSentByDayState {
  emailSentByDayLoading: boolean
  emailSentByDay: Array<EmailSentByDay> | undefined
}
const initialState: EmailSentByDayState = {
  emailSentByDayLoading: false,
  emailSentByDay: undefined,
}

export const setEmailSentByDayLoading = createAction<boolean>(
  'emailSentByDay/setEmailSentByDayLoading'
)
export const setEmailSentByDay = createAction<Array<EmailSentByDay>>(
  'emailSentByDay/setEmailSentByDay'
)

export const emailSentByDaySlice = createSlice({
  name: 'emailSentByDay',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setEmailSentByDayLoading, (state, action) => {
        state.emailSentByDayLoading = action.payload
      })
      .addCase(setEmailSentByDay, (state, action) => {
        state.emailSentByDay = action.payload
      })
  },
})
export default emailSentByDaySlice.reducer

// Selectors
export const selectEmailSentByDayLoading = (state) =>
  state.emailSent.emailSentByDayLoading
export const selectEmailSentByDay = (state) => state.emailSent.emailSentByDay
