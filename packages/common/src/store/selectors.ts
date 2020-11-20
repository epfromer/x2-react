import { RootState } from '../index'
import {
  Custodian,
  Email,
  EmailSentByDay,
  EmailXferedDatum,
  SearchHistoryEntry,
  WordCloudTag,
} from './types'

// appSettingsSlice
export const selectDarkMode = (state: RootState): boolean =>
  state.appSettings.darkMode
export const selectThemeName = (state: RootState): string =>
  state.appSettings.themeName

// authenticationSlice
export const selectAuthenticated = (state: RootState): boolean =>
  state.authentication.authenticated
export const selectUsername = (state: RootState): string =>
  state.authentication.username

// custodiansSlice
export const selectCustodiansLoading = (state: RootState): boolean =>
  state.custodians.custodiansLoading
export const selectCustodians = (
  state: RootState
): Array<Custodian> | undefined => state.custodians.custodians
export function selectEmailSenders(state: RootState): Array<EmailXferedDatum> {
  const custodians = state.custodians.custodians
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian: Custodian) => {
      if (custodian.senderTotal) {
        data.push({
          name: custodian.name,
          value: custodian.senderTotal,
          color: custodian.color,
        })
      }
    })
  }
  return data
}
export function selectEmailReceivers(
  state: RootState
): Array<EmailXferedDatum> {
  const custodians = state.custodians.custodians
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian: Custodian) => {
      if (custodian.receiverTotal) {
        data.push({
          name: custodian.name,
          value: custodian.receiverTotal,
          color: custodian.color,
        })
      }
    })
  }
  return data
}
interface IDColorKey {
  id: string
  color: string
}
export interface EmailByCustodianDatum {
  data: Array<[string, string, number]>
  nodes: Array<IDColorKey>
}
export function selectEmailSentByCustodian(
  state: RootState
): EmailByCustodianDatum {
  const custodianNameFromId = (id: string): string => {
    if (state.custodians && state.custodians.custodians) {
      const c = state.custodians.custodians.find((c: Custodian) => c.id === id)
      return c ? c.name : ''
    }
    return ''
  }

  const custodians = state.custodians.custodians
  const data: Array<[string, string, number]> = []
  const nodes: Array<IDColorKey> = []

  if (custodians) {
    //  create array of [from, to, number sent]
    custodians.forEach((fromCustodian: Custodian) => {
      fromCustodian.toCustodians.forEach((toCustodian) => {
        data.push([
          fromCustodian.name,
          custodianNameFromId(toCustodian.custodianId),
          toCustodian.total,
        ])
      })
    })
    // and array of color keys
    custodians.forEach((custodian: Custodian) => {
      nodes.push({ id: custodian.name, color: custodian.color })
    })
  }

  return { data, nodes }
}

// emailSentByDay
export const selectEmailSentByDayLoading = (state: RootState): boolean =>
  state.emailSent.emailSentByDayLoading
export const selectEmailSentByDay = (
  state: RootState
): Array<EmailSentByDay> | undefined => state.emailSent.emailSentByDay

// emailSlice
export const selectEmailLoading = (state: RootState): boolean =>
  state.email.emailLoading
export const selectEmail = (state: RootState): Array<Email> | undefined =>
  state.email.email
export const selectEmailTotal = (state: RootState): number =>
  state.email.emailTotal

// querySlice
export const selectAllText = (state: RootState): string => state.query.allText
export const selectBody = (state: RootState): string => state.query.body
export const selectEmailListPage = (state: RootState): number =>
  state.query.emailListPage
export const selectFrom = (state: RootState): string => state.query.from
export const selectOrder = (state: RootState): number => state.query.order
export const selectSort = (state: RootState): string => state.query.sort
export const selectSent = (state: RootState): string => state.query.sent
export const selectSubject = (state: RootState): string => state.query.subject
export const selectTo = (state: RootState): string => state.query.to

// searchHistorySlice
export const selectSearchHistoryLoading = (state: RootState): boolean =>
  state.searchHistory.searchHistoryLoading
export const selectSearchHistory = (
  state: RootState
): Array<SearchHistoryEntry> | undefined => state.searchHistory.searchHistory

// wordCloudSlice
export const selectWordCloudLoading = (state: RootState): boolean =>
  state.wordCloud.wordCloudLoading
export const selectWordCloud = (
  state: RootState
): Array<WordCloudTag> | undefined => state.wordCloud.wordCloud
