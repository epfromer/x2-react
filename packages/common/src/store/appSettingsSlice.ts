import AsyncStorage from '@react-native-community/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppSettingsState {
  darkMode: boolean
  orientation: string
}
const initialState: AppSettingsState = {
  darkMode: false,
  orientation: 'portrait',
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
export const selectDarkMode = (state) => state.appSettings.darkMode
