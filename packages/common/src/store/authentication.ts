import { setAuthenticated, setUsername, store } from './index'

export function authenticate(username: string, password: string): boolean {
  // connect to some authentication service?
  const isAuthenticated = password === 'foo'
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
