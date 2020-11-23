import AsyncStorage from '@react-native-community/async-storage'
import { createAction, createSlice, Store } from '@reduxjs/toolkit'
import request, { gql } from 'graphql-request'
import { RootState } from '..'
import { defaultThemeName, x2Server } from '../../constants'
import { setCustodians, setCustodiansLoading } from './custodiansSlice'
import {
  setEmailSentByDay,
  setEmailSentByDayLoading,
} from './emailSentByDaySlice'
import { setWordCloud, setWordCloudLoading } from './wordCloudSlice'

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

// selectors & getters
export const getDarkMode = (state: RootState): boolean =>
  state.appSettings.darkMode
export const getThemeName = (state: RootState): string =>
  state.appSettings.themeName

export async function loadAppSettingsAsync(store: Store): Promise<void> {
  try {
    let darkMode = false
    let themeName = defaultThemeName
    if (typeof Storage !== 'undefined') {
      if (
        localStorage.getItem('darkMode') &&
        localStorage.getItem('darkMode') === 'true'
      ) {
        darkMode = true
      }
      if (
        localStorage.getItem('themeName') &&
        localStorage.getItem('themeName') !== 'null'
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        themeName = localStorage.getItem('themeName')
      }
    } else {
      let value = await AsyncStorage.getItem('darkMode')
      if (value === 'true') darkMode = true
      value = await AsyncStorage.getItem('themeName')
      if (value) themeName = value
    }
    store.dispatch(setDarkMode(darkMode))
    store.dispatch(setThemeName(themeName))
  } catch (e) {
    console.error(e)
  }
}

export async function setDarkModeAsync(
  store: Store,
  darkMode: boolean
): Promise<void> {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('darkMode', String(darkMode))
  } else {
    await AsyncStorage.setItem('darkMode', String(darkMode))
  }
  store.dispatch(setDarkMode(darkMode))
}

export async function setThemeNameAsync(
  store: Store,
  themeName: string
): Promise<void> {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('themeName', themeName)
  } else {
    await AsyncStorage.setItem('themeName', themeName)
  }
  store.dispatch(setThemeName(themeName))
}

const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms))

// graphQl query
export function getInitialDataAsync(store: Store): void {
  store.dispatch(setWordCloudLoading(true))
  store.dispatch(setEmailSentByDayLoading(true))
  store.dispatch(setCustodiansLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = gql`
    {
      getWordCloud {
        tag
        weight
      }
      getEmailSentByDay {
        sent
        total
      }
      getCustodians {
        id
        name
        title
        color
        senderTotal
        receiverTotal
        toCustodians {
          custodianId
          total
        }
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then(async (data) => {
      // await sleep(5000)
      store.dispatch(setWordCloud(data.getWordCloud))
      store.dispatch(setEmailSentByDay(data.getEmailSentByDay))
      store.dispatch(setCustodians(data.getCustodians))
      store.dispatch(setWordCloudLoading(false))
      store.dispatch(setEmailSentByDayLoading(false))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((e) => console.error(e))
}
