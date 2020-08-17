import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import appSettingsReducer from './appSettingsSlice'
import contactsReducer from './contactsSlice'
import emailSentReducer from './emailSentSlice'
import emailReducer from './emailSlice'
import queryReducer from './querySlice'
import wordCloudReducer from './wordCloudSlice'

export * from './appSettingsSlice'
export * from './contactsSlice'
export * from './emailSentSlice'
export * from './emailSlice'
export * from './querySlice'
export * from './wordCloudSlice'

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    contacts: contactsReducer,
    email: emailReducer,
    emailSent: emailSentReducer,
    query: queryReducer,
    wordCloud: wordCloudReducer,
  },
  middleware,
})
