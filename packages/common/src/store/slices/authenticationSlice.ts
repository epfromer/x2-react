import { createAction, createSlice } from '@reduxjs/toolkit'

export interface AuthenticationState {
  authenticated: boolean
  username: string
}
const initialState: AuthenticationState = {
  authenticated: false,
  username: '',
}

export const setAuthenticated = createAction<boolean>(
  'authentication/setAuthenticated'
)
export const setUsername = createAction<string>('authentication/setUsername')

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAuthenticated, (state, action) => {
        state.authenticated = action.payload
      })
      .addCase(setUsername, (state, action) => {
        state.username = action.payload
      })
  },
})
export default authenticationSlice.reducer

// Selectors
export const selectAuthenticated = (state: any) =>
  state.authentication.authenticated
export const selectUsername = (state: any) => state.authentication.username
