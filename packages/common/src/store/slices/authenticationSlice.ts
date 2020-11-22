import { createAction, createSlice, Store } from '@reduxjs/toolkit'

export interface AuthenticationState {
  authenticated: boolean
  username: string
}
const initialState: AuthenticationState = {
  authenticated: false,
  username: '',
}

// Actions
export const setAuthenticated = createAction<boolean>(
  'authentication/setAuthenticated'
)
export const setUsername = createAction<string>('authentication/setUsername')

// Reducer
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

// selectors & getters
export const selectAuthenticated = (state: {
  authentication: { authenticated: boolean }
}): boolean => state.authentication.authenticated
export const selectUsername = (state: {
  authentication: { username: string }
}): string => state.authentication.username

export function signOut(store: Store): void {
  store.dispatch(setAuthenticated(false))
  store.dispatch(setUsername(''))
}
