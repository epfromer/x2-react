import { createAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { EmailSentByDay } from '../types'

export interface EmailSentByDayState {
  emailSentByDayLoading: boolean
  emailSentByDay: Array<EmailSentByDay> | undefined
}
const initialState: EmailSentByDayState = {
  emailSentByDayLoading: false,
  emailSentByDay: undefined,
}

// Actions
export const setEmailSentByDayLoading = createAction<boolean>(
  'emailSentByDay/setEmailSentByDayLoading'
)
export const setEmailSentByDay = createAction<Array<EmailSentByDay>>(
  'emailSentByDay/setEmailSentByDay'
)

// Reducer
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

// selectors & getters
export const getEmailSentByDayLoading = (state: RootState): boolean =>
  state.emailSentByDay.emailSentByDayLoading
export const getEmailSentByDay = (
  state: RootState
): Array<EmailSentByDay> | undefined => state.emailSentByDay.emailSentByDay
