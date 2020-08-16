import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import {
  CachedQuery,
  Contact,
  Email,
  EmailSentByDay,
  WordCloudTag,
} from './types'

export interface AppSettingsState {
  darkMode: boolean
  orientation: string
  cachedQuery: CachedQuery | undefined
  emails: Array<Email>
  emailsLoading: false
  totalEmails: number
  emailListPage: number
  querySort: string
  queryOrder: number
  sent: string
  timeSpan: number
  from: string
  to: string
  subject: string
  allText: string
  body: string
  emailSentLoading: boolean
  emailSent: Array<EmailSentByDay> | undefined
  wordCloudLoading: boolean
  wordCloud: Array<WordCloudTag> | undefined
  contactsLoading: boolean
  contacts: Array<Contact> | undefined
}
const initialState: AppSettingsState = {
  // app settings
  darkMode: false,
  orientation: 'portrait',
  // search results
  cachedQuery: undefined,
  emails: [],
  emailsLoading: false,
  totalEmails: 0,
  // email list
  emailListPage: 0,
  // query
  querySort: 'sent',
  queryOrder: 1,
  sent: '',
  timeSpan: 0,
  from: '',
  to: '',
  subject: '',
  allText: '',
  body: '',
  // stats
  emailSentLoading: false,
  emailSent: undefined,
  wordCloudLoading: false,
  wordCloud: undefined,
  contactsLoading: false,
  contacts: undefined,
}

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
  },
})

// TODO
export const selectDarkMode = (state: RootState) => state.appSettings.darkMode

export const { setDarkMode } = appSettingsSlice.actions

export default appSettingsSlice.reducer
