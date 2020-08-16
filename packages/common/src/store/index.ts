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
import wordCloudReducer from './wordCloudSlice'

export * from './appSettingsSlice'
export * from './contactsSlice'
export * from './emailSentSlice'
export * from './wordCloudSlice'

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

//     case 'appendEmails': {
//       const s: RootState = _.cloneDeep(state)
//       action.value.map((email: Email) => s.emails.push({ ...email }))
//       return s
//     }
//     case 'clearSearch': {
//       const s = _.cloneDeep(state)
//       s.emailListPage = 0
//       s.querySort = 'sent'
//       s.queryOrder = 1
//       s.sent = ''
//       s.timeSpan = 0
//       s.from = ''
//       s.to = ''
//       s.subject = ''
//       s.allText = ''
//       s.body = ''
//       return s
//     }

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    contacts: contactsReducer,
    emailSent: emailSentReducer,
    wordCloud: wordCloudReducer,
  },
  middleware,
})
