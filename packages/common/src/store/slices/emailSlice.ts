import { createAction, createSlice } from '@reduxjs/toolkit'
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

export const setEmailLoading = createAction<boolean>('email/setEmailLoading')
export const setEmail = createAction<Array<Email>>('email/setEmail')
export const appendEmail = createAction<Array<Email>>('email/appendEmail')
export const setEmailTotal = createAction<number>('email/setEmailTotal')

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
