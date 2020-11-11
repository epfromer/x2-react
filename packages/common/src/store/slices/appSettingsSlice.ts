import { createAction, createSlice } from '@reduxjs/toolkit'
import { defaultThemeName } from '../../constants'

export interface AppSettingsState {
  darkMode: boolean
  orientation: string
  themeName: string
}
const initialState: AppSettingsState = {
  darkMode: false,
  orientation: 'portrait',
  themeName: defaultThemeName,
}

// Actions
export const setDarkMode = createAction<boolean>('appSettings/setDarkMode')
export const setThemeName = createAction<string>('appSettings/setThemeName')

// Reducer
export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setDarkMode, (state, action) => {
        state.darkMode = action.payload
      })
      .addCase(setThemeName, (state, action) => {
        state.themeName = action.payload
      })
  },
})
export default appSettingsSlice.reducer
