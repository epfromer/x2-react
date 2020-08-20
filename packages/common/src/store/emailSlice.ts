import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
      // console.log('setting email')
      state.email = action.payload
    },
    appendEmail: (state, action: PayloadAction<Array<Email>>) => {
      if (state.email) {
        // console.log('appending email')
        state.email.push(...action.payload)
      } else {
        // console.log('setting email')
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
export const selectEmailLoading = (state) => state.email.emailLoading
export const selectEmail = (state) => state.email.email
export const selectEmailTotal = (state) => state.email.emailTotal
