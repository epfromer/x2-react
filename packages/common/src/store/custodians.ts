import { gql, request } from 'graphql-request'
import { x2Server } from '../constants'
import { setCustodians, setCustodiansLoading, store } from './index'

export function getCustodiansAsync() {
  store.dispatch(setCustodiansLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = gql`
    {
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
      store.dispatch(setCustodians(data.getCustodians))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((err) => console.error('getCustodiansAsync: ', err))
}
