import { createAction, createSlice, Store } from '@reduxjs/toolkit'
import { gql, GraphQLClient } from 'graphql-request'
import { RootState } from '..'
import { setCustodians, setCustodiansLoading } from './custodiansSlice'
import {
  setEmailSentByDay,
  setEmailSentByDayLoading,
} from './emailSentByDaySlice'
import { setWordCloud, setWordCloudLoading } from './wordCloudSlice'

const VERBOSE = process.env.REACT_APP_VERBOSE === '1'

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
    if (
      localStorage.getItem('darkMode') &&
      localStorage.getItem('darkMode') === 'true'
    ) {
      darkMode = true
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
  localStorage.setItem('darkMode', String(darkMode))
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
  const proxy = `${process.env.REACT_APP_CORS}/`
  const endpoint = `${proxy}${process.env.REACT_APP_X2_SERVER}/graphql/`
  if (VERBOSE) console.log('getInitialDataAsync', endpoint)
  const graphQLClient = new GraphQLClient(endpoint, { method: 'GET' })
  graphQLClient
    .request(query)
    .then(async (data: any) => {
      if (VERBOSE) console.log('getInitialDataAsync completed', data)
      store.dispatch(setWordCloud(data.getWordCloud))
      store.dispatch(setEmailSentByDay(data.getEmailSentByDay))
      store.dispatch(setCustodians(data.getCustodians))
      store.dispatch(setWordCloudLoading(false))
      store.dispatch(setEmailSentByDayLoading(false))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((e) => console.error('getInitialDataAsync', e))
}
