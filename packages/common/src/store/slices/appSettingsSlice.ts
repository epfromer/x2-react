import AsyncStorage from '@react-native-community/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImportLogEntry } from '../types'

export interface AppSettingsState {
  darkMode: boolean
  orientation: string
  importLog: Array<ImportLogEntry>
  themeName: string
}
const initialState: AppSettingsState = {
  darkMode: false,
  orientation: 'portrait',
  importLog: undefined,
  themeName: 'Purple',
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
    setThemeName: (state, action: PayloadAction<string>) => {
      state.themeName = action.payload
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('themeName', state.themeName)
      } else {
        AsyncStorage.setItem('themeName', state.themeName)
      }
    },
  },
})
export default appSettingsSlice.reducer
export const {
  setDarkMode,
  setImportLog,
  setThemeName,
} = appSettingsSlice.actions

// Selectors
export const selectDarkMode = (state) => state.appSettings.darkMode
export const selectImportLog = (state) => state.appSettings.importLog
export const selectThemeName = (state) => state.appSettings.themeName
