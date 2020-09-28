import { gql, request } from 'graphql-request'
import { x2Server } from '../constants'
import { setImportLog, store } from './index'

let importTimer
function getImportStatusInterval() {
  const server = process.env.REACT_APP_X2_SERVER
    ? process.env.REACT_APP_X2_SERVER
    : x2Server
  const query = gql`
    {
      getImportStatus {
        id
        timestamp
        entry
      }
    }
  `
  request(`${server}/graphql/`, query)
    .then((data) => store.dispatch(setImportLog(data.getImportStatus)))
    .catch((err) => console.error('getImportStatusInterval: ', err))
}
export function getImportStatus() {
  if (importTimer) return
  importTimer = setInterval(getImportStatusInterval, 2000)
}
export function stopImportStatusInterval() {
  if (!importTimer) return
  clearInterval(importTimer)
  importTimer = undefined
}
