/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createSlice, Store } from '@reduxjs/toolkit'
import { gql, request } from 'graphql-request'
import { RootState } from '..'
import { x2Server } from '../../constants'
import { Custodian, EmailXferedDatum } from '../types'

export interface CustodiansState {
  custodiansLoading: boolean
  custodians: Array<Custodian> | undefined
}
const initialState: CustodiansState = {
  custodiansLoading: false,
  custodians: undefined,
}

// Actions
export const setCustodiansLoading = createAction<boolean>(
  'custodians/setCustodiansLoading'
)
export const setCustodians = createAction<Array<Custodian>>(
  'custodians/setCustodians'
)

// Reducer
export const custodiansSlice = createSlice({
  name: 'custodians',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCustodiansLoading, (state, action) => {
        state.custodiansLoading = action.payload
      })
      .addCase(setCustodians, (state, action) => {
        state.custodians = action.payload
      })
  },
})
export default custodiansSlice.reducer

// selectors & getters
export const getCustodiansLoading = (state: RootState): boolean =>
  state.custodians.custodiansLoading
export const getCustodians = (state: RootState): Array<Custodian> | undefined =>
  state.custodians.custodians
export function getEmailSenders(state: RootState): Array<EmailXferedDatum> {
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
export function getEmailReceivers(state: RootState): Array<EmailXferedDatum> {
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
export interface EmailSent {
  source: string
  target: string
  value: number
}
export interface EmailSentByCustodian {
  data: Array<EmailSent>
  nodes: Array<IDColorKey>
}
export function getEmailSentByCustodian(
  state: RootState
): EmailSentByCustodian {
  const custodianNameFromId = (id: string): string => {
    if (state.custodians && state.custodians.custodians) {
      const c = state.custodians.custodians.find((c: Custodian) => c.id === id)
      return c ? c.name : ''
    }
    return ''
  }

  const custodians = state.custodians.custodians
  const data: Array<EmailSent> = []
  const nodes: Array<IDColorKey> = []

  if (custodians) {
    custodians.forEach((fromCustodian: Custodian) => {
      fromCustodian.toCustodians.forEach((toCustodian) => {
        data.push({
          source: fromCustodian.name,
          target: custodianNameFromId(toCustodian.custodianId),
          value: toCustodian.total,
        })
      })
    })
    // and array of color keys
    custodians.forEach((custodian: Custodian) => {
      nodes.push({ id: custodian.name, color: custodian.color })
    })
  }

  return { data, nodes }
}

export function getCustodiansAsync(store: Store): void {
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
    .catch((e) => console.error(e))
}
