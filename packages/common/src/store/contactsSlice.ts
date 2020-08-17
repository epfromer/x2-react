import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMAIL_SERVER } from '../constants'
import { RootState, store } from './index'
import { Contact, EmailSentStat, EmailXferedDatum } from './types'

export interface ContactsState {
  contactsLoading: boolean
  contacts: Array<Contact> | undefined
}

const initialState: ContactsState = {
  contactsLoading: false,
  contacts: undefined,
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactsLoading: (state, action: PayloadAction<boolean>) => {
      state.contactsLoading = action.payload
    },
    setContacts: (state, action: PayloadAction<Array<Contact>>) => {
      state.contacts = action.payload
    },
  },
})
export default contactsSlice.reducer
export const { setContactsLoading, setContacts } = contactsSlice.actions

// Selectors
export const selectContactsLoading = (state: RootState) =>
  state.contacts.contactsLoading
export const selectContacts = (state: RootState) => state.contacts.contacts
export function selectEmailSenders(state: RootState) {
  const data: Array<EmailXferedDatum> = []
  if (state.contacts.contacts) {
    state.contacts.contacts.forEach((contact) => {
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
export function selectEmailReceivers(state: RootState) {
  const data: Array<EmailXferedDatum> = []
  if (state.contacts.contacts) {
    state.contacts.contacts.forEach((contact) => {
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
export function selectEmailSentByContact(state: RootState) {
  //  create array of [from, to, number sent]
  const data: Array<[string, string, number]> = []
  if (state.contacts.contacts) {
    state.contacts.contacts.forEach((contact) => {
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
  }

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
  if (state.contacts.contacts) {
    state.contacts.contacts.forEach((contact) => {
      nodes.push({
        id: contact.name,
        color: contact.color,
        emailTotal: emailTotal.get(contact.name),
      })
    })
  }

  return { data, nodes }
}

// Aync actions
export async function getContactsAsync() {
  store.dispatch(setContactsLoading(true))
  fetch(`${EMAIL_SERVER}/contacts`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setContacts(json)))
    .then(() => store.dispatch(setContactsLoading(false)))
    .catch((error) => console.error('getContactsAsync: ', error))
}
