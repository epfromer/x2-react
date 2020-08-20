import { store } from './index'
import { Email } from './types'

export const getEmailById = (id: string) => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  return state.email.email.find((e: Email) => e._id === id)
}
export const getNextEmailId = (id: string) => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  const i = state.email.email.findIndex((e: Email) => e._id === id)
  return i < state.email.email.length - 1
    ? state.email.email[i + 1]._id
    : undefined
}
export const getPreviousEmailId = (id: string) => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  const i = state.email.email.findIndex((e: Email) => e._id === id)
  return i > 0 ? state.email.email[i - 1]._id : undefined
}
export const getEmailIndex = (id: string) => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  return state.email.email.findIndex((e: Email) => e._id === id) + 1
}