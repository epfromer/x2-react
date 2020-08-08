import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Action, Email, RootState } from './types'

const initialState: RootState = {
  // search results
  cachedQuery: undefined,
  emails: [],
  emailsLoading: false,
  totalEmails: 0,

  // email list
  emailListPage: 0,

  // query
  querySort: 'sent',
  queryOrder: 1,
  sent: '',
  timeSpan: 0,
  from: '',
  to: '',
  subject: '',
  allText: '',
  body: '',

  // stats
  emailSentLoading: false,
  emailSent: undefined,
  wordCloudLoading: false,
  wordCloud: undefined,
  contactsLoading: false,
  contacts: undefined,

  // app settings
  darkMode: false,
  // darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
  orientation: 'portrait',
}

function reducer(state: RootState = initialState, action: Action) {
  switch (action.type) {
    case 'setReduxState': {
      const s: RootState = _.cloneDeep(state)
      if (action.key === 'emails') {
        // console.log('overwrite emails')
        s.emails = _.cloneDeep(action.value)
      } else if (action.key === 'cachedQuery') {
        s.cachedQuery = _.cloneDeep(action.value)
      } else if (action.key === 'wordCloud') {
        s.wordCloud = _.cloneDeep(action.value)
      } else if (action.key === 'contacts') {
        s.contacts = _.cloneDeep(action.value)
        s.contacts?.sort((a: any, b: any) => {
          const aName = a.name.toLowerCase()
          const bName = b.name.toLowerCase()
          if (aName < bName) return -1
          else if (aName < bName) return 1
          else return 0
        })
      } else if (action.key === 'emailSent') {
        s.emailSent = _.cloneDeep(action.value)
      } else {
        // @ts-ignore
        // console.log('setting', action.key, action.value)
        s[action.key] = action.value
      }
      return s
    }
    case 'appendEmails': {
      // console.log('append emails')
      const s: RootState = _.cloneDeep(state)
      action.value.map((email: Email) => s.emails.push({ ...email }))
      return s
    }
    case 'saveAppSettings': {
      const s = _.cloneDeep(state)
      AsyncStorage.setItem('darkMode', String(state.darkMode))
      // localStorage.setItem('darkMode', String(state.darkMode))
      return s
    }
    case 'clearSearch': {
      const s = _.cloneDeep(state)
      s.emailListPage = 0
      s.querySort = 'sent'
      s.queryOrder = 1
      s.sent = ''
      s.timeSpan = 0
      s.from = ''
      s.to = ''
      s.subject = ''
      s.allText = ''
      s.body = ''
      return s
    }
    default:
      return state
  }
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware))
