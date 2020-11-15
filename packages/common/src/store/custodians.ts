import { gql, request } from 'graphql-request'
import { x2Server } from '../constants'
import { setCustodians, setCustodiansLoading, store } from './index'

// TODO roll into slice

export function getCustodiansAsync(): void {
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
    // TODO .catch((e) => console.error(e))
    .catch((err) => console.error('getCustodiansAsync: ', err))
}
