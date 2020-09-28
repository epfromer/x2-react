import { gql, request } from 'graphql-request'
import { x2Server } from '../constants'
import { setSearchHistoryLoading, setSearchHistory, store } from './index'

export function getSearchHistoryAsync() {
  store.dispatch(setSearchHistoryLoading(true))
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = gql`
    {
      getSearchHistory {
        id
        timestamp
        entry
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => {
      store.dispatch(setSearchHistory(data.getSearchHistory))
      store.dispatch(setSearchHistoryLoading(false))
    })
    .catch((err) => console.error('getInitialDataAsync: ', err))
}
