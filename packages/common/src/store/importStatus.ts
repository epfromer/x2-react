import { gql, request } from 'graphql-request'
import { x2Server } from '../constants'
import { setImportLog, store } from './index'

let importTimer: number | undefined
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
export function getImportStatus(): void {
  if (importTimer) return
  importTimer = setInterval(getImportStatusInterval, 2000)
}
export function stopImportStatusInterval(): void {
  if (!importTimer) return
  clearInterval(importTimer)
  importTimer = undefined
}
export function getImportStatusTimer(): number | undefined {
  return importTimer
}
