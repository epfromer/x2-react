import AsyncStorage from '@react-native-community/async-storage'
import { createAction, createSlice } from '@reduxjs/toolkit'
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

export const setDarkMode = createAction<boolean>('appSettings/setDarkMode')
export const setImportLog = createAction<Array<ImportLogEntry>>(
  'appSettings/setImportLog'
)
export const setThemeName = createAction<string>('appSettings/setThemeName')

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setDarkMode, (state, action) => {
        state.darkMode = action.payload
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('darkMode', String(state.darkMode))
        } else {
          AsyncStorage.setItem('darkMode', String(state.darkMode))
        }
      })
      .addCase(setImportLog, (state, action) => {
        state.importLog = action.payload
      })
      .addCase(setThemeName, (state, action) => {
        state.themeName = action.payload
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('themeName', state.themeName)
        } else {
          AsyncStorage.setItem('themeName', state.themeName)
        }
      })
  },
})
export default appSettingsSlice.reducer

// Selectors
export const selectDarkMode = (state) => state.appSettings.darkMode
export const selectImportLog = (state) => state.appSettings.importLog
export const selectThemeName = (state) => state.appSettings.themeName
