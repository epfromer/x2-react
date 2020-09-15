import AsyncStorage from '@react-native-community/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImportLogEntry } from './types'

export interface AppSettingsState {
  darkMode: boolean
  orientation: string
  importLog: Array<ImportLogEntry>
}
const initialState: AppSettingsState = {
  darkMode: false,
  orientation: 'portrait',
  importLog: undefined,
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
    setImportLog: (state, action: PayloadAction<Array<ImportLogEntry>>) => {
      state.importLog = action.payload
    },
  },
})
export default appSettingsSlice.reducer
export const { setDarkMode, setImportLog } = appSettingsSlice.actions

// Selectors
export const selectDarkMode = (state) => state.appSettings.darkMode
export const selectImportLog = (state) => state.appSettings.importLog
