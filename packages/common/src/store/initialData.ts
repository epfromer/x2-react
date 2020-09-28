import { gql, request } from 'graphql-request'
import { x2Server } from '../constants'
import {
  setCustodians,
  setCustodiansLoading,
  setEmailSentByDay,
  setEmailSentByDayLoading,
  setWordCloud,
  setWordCloudLoading,
  store,
} from './index'

export function getInitialDataAsync() {
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
    .then((data) => {
      if (
        !data.getWordCloud ||
        !data.getEmailSentByDay ||
        !data.getCustodians
      ) {
        console.error('x2 server returns null data')
      }
      store.dispatch(setWordCloud(data.getWordCloud))
      store.dispatch(setEmailSentByDay(data.getEmailSentByDay))
      store.dispatch(setCustodians(data.getCustodians))
    })
    .then(() => {
      store.dispatch(setWordCloudLoading(false))
      store.dispatch(setEmailSentByDayLoading(false))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((err) => console.error('getInitialDataAsync: ', err))
}
