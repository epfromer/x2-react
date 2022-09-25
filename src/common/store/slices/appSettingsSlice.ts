import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAction, createSlice, Store } from '@reduxjs/toolkit'
import { gql, GraphQLClient } from 'graphql-request'
import { RootState } from '@klonzo/common/src/store'
import { defaultThemeName } from '@klonzo/common/src/constants'
import { setCustodians, setCustodiansLoading } from '@klonzo/common/src/store/slices/custodiansSlice'
import {
  setEmailSentByDay,
  setEmailSentByDayLoading,
} from '@klonzo/common/src/store/slices/emailSentByDaySlice'
import { setWordCloud, setWordCloudLoading } from '@klonzo/common/src/store/slices/wordCloudSlice'

export interface AppSettingsState {
  darkMode: boolean
  orientation: string
}
const initialState: AppSettingsState = {
  darkMode: false,
  orientation: 'portrait',
}

// Actions
export const setDarkMode = createAction<boolean>('appSettings/setDarkMode')

// Reducer
export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setDarkMode, (state, action) => {
      state.darkMode = action.payload
    })
  },
})
export default appSettingsSlice.reducer

// selectors & getters
export const getDarkMode = (state: RootState): boolean =>
  state.appSettings.darkMode

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
      const value = await AsyncStorage.getItem('darkMode')
      if (value === 'true') darkMode = true
    }
    store.dispatch(setDarkMode(darkMode))
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

// const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms))

// graphQl query
export function getInitialDataAsync(store: Store): void {
  store.dispatch(setWordCloudLoading(true))
  store.dispatch(setEmailSentByDayLoading(true))
  store.dispatch(setCustodiansLoading(true))
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
  // console.log('setting headers')
  const endpoint = `${process.env.REACT_APP_X2_SERVER}/graphql/`
  const graphQLClient = new GraphQLClient(endpoint, {
    mode: 'no-cors',
  })
  graphQLClient.setHeader('Access-Control-Allow-Origin', '*')
  // console.log('calling client')
  graphQLClient
    .request(query)
    .then(async (data) => {
      // console.log('got it!')
      // await sleep(5000)
      store.dispatch(setWordCloud(data.getWordCloud))
      store.dispatch(setEmailSentByDay(data.getEmailSentByDay))
      store.dispatch(setCustodians(data.getCustodians))
      store.dispatch(setWordCloudLoading(false))
      store.dispatch(setEmailSentByDayLoading(false))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((e) => {
      console.log('got an error')
      console.error(e)
    })
  // console.log('returning from calling client')
}
