import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMAIL_SERVER } from './constants'
import { RootState, store } from './index'
import { Contact, EmailXferedDatum } from './types'

export interface contactsState {
  contactsLoading: boolean
  contacts: Array<Contact> | undefined
}

const initialState: contactsState = {
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
export const selectEmailSenders = (state: RootState) => {
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

// Aync actions
export async function getContactsAsync() {
  store.dispatch(setContactsLoading(true))
  fetch(`${EMAIL_SERVER}/contacts`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setContacts(json)))
    .then(() => store.dispatch(setContactsLoading(false)))
    .catch((error) => console.error('getContactsAsync: ', error))
}
