import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthenticationState {
  authenticated: boolean
}

const initialState: AuthenticationState = {
  authenticated: false,
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload
    },
  },
})
export default authenticationSlice.reducer
export const { setAuthenticated } = authenticationSlice.actions

// Selectors
export const selectAuthentication = (state) =>
  state.authentication.authenticated
