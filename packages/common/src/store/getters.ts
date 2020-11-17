import { store } from './index'
import { Email } from './types'

// TODO roll into slice
// TODO select -> get

export const getEmailById = (id: string): Email | undefined => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  return state.email.email.find((e: Email) => e.id === id)
}

export const getNextEmailId = (id: string): string | undefined => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  const i = state.email.email.findIndex((e: Email) => e.id === id)
  return i < state.email.email.length - 1
    ? state.email.email[i + 1].id
    : undefined
}

export const getPreviousEmailId = (id: string): string | undefined => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  const i = state.email.email.findIndex((e: Email) => e.id === id)
  return i > 0 ? state.email.email[i - 1].id : undefined
}

export const getEmailIndex = (id: string): number | undefined => {
  const state = store.getState()
  if (!state.email.email || !state.email.email.length) return undefined
  return state.email.email.findIndex((e: Email) => e.id === id) + 1
}

export const getDateStr = (date: Date): string => {
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}
