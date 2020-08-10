import { RootState, EmailXferedDatum, EmailSentStat } from './types'

// selectors, aka getters
export const getEmailById = (state: RootState, id: string) =>
  state.emails.find((e) => e._id === id)

export const getNextEmail = (state: RootState, id: string) => {
  if (!state.emails || !state.emails.length) return undefined
  const i = state.emails.findIndex((e) => e._id === id)
  return i < state.emails.length - 1 ? state.emails[i + 1] : undefined
}

export const getPreviousEmail = (state: RootState, id: string) => {
  if (!state.emails || !state.emails.length) return undefined
  const i = state.emails.findIndex((e) => e._id === id)
  return i > 0 ? state.emails[i - 1] : undefined
}

export const getEmailIndex = (state: RootState, id: string) =>
  state.emails.findIndex((e) => e._id === id) + 1

export const getEmailSentStats = (state: RootState) => {
  // create array of [from, to, number sent]
  const data: Array<[string, string, number]> = []
  state.contacts?.forEach((contact) => {
    const sent = new Map()
    contact.asSender.forEach((email) => {
      email.to.forEach((recipient) => {
        if (sent.has(recipient)) {
          sent.set(recipient, sent.get(recipient) + 1)
        } else {
          sent.set(recipient, 1)
        }
      })
    })
    sent.forEach((v, k) => {
      if (contact.name !== k) {
        data.push([contact.name, k, v])
      }
    })
  })

  const emailTotal = new Map()
  data.forEach((contact) => {
    if (emailTotal.has(contact[0])) {
      emailTotal.set(contact[0], emailTotal.get(contact[0]) + contact[2])
    } else {
      emailTotal.set(contact[0], contact[2])
    }
    if (emailTotal.has(contact[1])) {
      emailTotal.set(contact[1], emailTotal.get(contact[1]) + contact[2])
    } else {
      emailTotal.set(contact[1], contact[2])
    }
  })

  const nodes: Array<EmailSentStat> = []
  state.contacts?.forEach((contact) => {
    nodes.push({
      id: contact.name,
      color: contact.color,
      emailTotal: emailTotal.get(contact.name),
    })
  })

  return { data, nodes }
}

export function getEmailSenders(state: RootState) {
  const data: Array<EmailXferedDatum> = []
  if (state.contacts) {
    state.contacts.forEach((contact) => {
      if (contact.senderTotal) {
        data.push({
          name: contact.name,
          value: contact.senderTotal,
          color: contact.color,
        })
      }
    })
  }
  return data
}

export function getEmailReceivers(state: RootState) {
  const data: Array<EmailXferedDatum> = []
  if (state.contacts) {
    state.contacts.forEach((contact) => {
      if (contact.senderTotal) {
        data.push({
          name: contact.name,
          value: contact.receiverTotal,
          color: contact.color,
        })
      }
    })
  }
  return data
}
