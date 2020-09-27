import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthenticationState {
  authenticated: boolean
  username: string
}

const initialState: AuthenticationState = {
  authenticated: false,
  username: '',
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
  },
})
export default authenticationSlice.reducer
export const { setAuthenticated, setUsername } = authenticationSlice.actions

// Selectors
export const selectAuthenticated = (state) => state.authentication.authenticated
export const selectUsername = (state) => state.authentication.username
