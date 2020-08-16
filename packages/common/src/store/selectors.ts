// selectors, aka getters
export const getEmailById = (state: any, id: string) => {
  if (!state.emails || !state.emails.length) return undefined
  return state.emails.find((e: any) => e._id === id)
}

export const getNextEmail = (state: any, id: string) => {
  if (!state.emails || !state.emails.length) return undefined
  const i = state.emails.findIndex((e: any) => e._id === id)
  return i < state.emails.length - 1 ? state.emails[i + 1] : undefined
}

export const getPreviousEmail = (state: any, id: string) => {
  if (!state.emails || !state.emails.length) return undefined
  const i = state.emails.findIndex((e: any) => e._id === id)
  return i > 0 ? state.emails[i - 1] : undefined
}

export const getEmailIndex = (state: any, id: string) =>
  state.emails.findIndex((e: any) => e._id === id) + 1
