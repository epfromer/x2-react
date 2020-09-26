import {
  Action,
  configureStore,
  ThunkAction,
  createSerializableStateInvariantMiddleware,
} from '@reduxjs/toolkit'
// import logger from 'redux-logger'
import appSettingsReducer from './appSettingsSlice'
import authenticationReducer from './authenticationSlice'
import custodiansReducer from './custodiansSlice'
import emailSentReducer from './emailSentByDaySlice'
import emailReducer from './emailSlice'
import queryReducer from './querySlice'
import wordCloudReducer from './wordCloudSlice'

export * from './appSettingsSlice'
export * from './authenticationSlice'
export * from './custodiansSlice'
export * from './emailSentByDaySlice'
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

// const middleware = [...getDefaultMiddleware(), logger]

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  warnAfter: 200,
})

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    authentication: authenticationReducer,
    custodians: custodiansReducer,
    email: emailReducer,
    emailSent: emailSentReducer,
    query: queryReducer,
    wordCloud: wordCloudReducer,
  },
  middleware: [serializableMiddleware],
})
