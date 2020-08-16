import AsyncStorage from '@react-native-community/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, store } from './index'
import { CachedQuery, Email } from './types'

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
}

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('darkMode', String(state.darkMode))
      } else {
        AsyncStorage.setItem('darkMode', String(state.darkMode))
      }
    },
  },
})
export default appSettingsSlice.reducer
export const { setDarkMode } = appSettingsSlice.actions

// Selectors
export const selectDarkMode = (state: RootState) => state.appSettings.darkMode

// Aync actions
export async function loadAppSettingsAsync() {
  try {
    let darkMode = false
    if (typeof Storage !== 'undefined') {
      darkMode = localStorage.getItem('darkMode') === 'true' ? true : false
    } else {
      let value = await AsyncStorage.getItem('darkMode')
      if (value !== null) {
        darkMode = value === 'true' ? true : false
      }
    }
    store.dispatch(setDarkMode(darkMode))
  } catch (e) {
    console.error(e)
  }
}
