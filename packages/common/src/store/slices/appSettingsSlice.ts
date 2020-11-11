import { createAction, createSlice } from '@reduxjs/toolkit'
import { defaultThemeName } from '../../constants'
import { ImportLogEntry } from '../types'

export interface AppSettingsState {
  darkMode: boolean
  orientation: string
  importLog: Array<ImportLogEntry> | undefined
  themeName: string
}
const initialState: AppSettingsState = {
  darkMode: false,
  orientation: 'portrait',
  importLog: undefined,
  themeName: defaultThemeName,
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
      })
      .addCase(setImportLog, (state, action) => {
        state.importLog = action.payload
      })
      .addCase(setThemeName, (state, action) => {
        state.themeName = action.payload
      })
  },
})
export default appSettingsSlice.reducer
