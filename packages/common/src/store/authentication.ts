import { setAuthenticated, setUsername, store } from './index'

export function authenticate(username: string, password: string): boolean {
  // NOW USING AUTH0 FOR SIGNIN
  const isAuthenticated = password !== ''
  if (isAuthenticated) {
    store.dispatch(setAuthenticated(true))
    store.dispatch(setUsername(username))
  }
  return isAuthenticated
}

export function signOut() {
  store.dispatch(setAuthenticated(false))
  store.dispatch(setUsername(''))
}
