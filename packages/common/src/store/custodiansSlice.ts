import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Custodian, EmailXferedDatum } from './types'

export interface CustodiansState {
  custodiansLoading: boolean
  custodians: Array<Custodian> | undefined
}

const initialState: CustodiansState = {
  custodiansLoading: false,
  custodians: undefined,
}

export const custodiansSlice = createSlice({
  name: 'custodians',
  initialState,
  reducers: {
    setCustodiansLoading: (state, action: PayloadAction<boolean>) => {
      state.custodiansLoading = action.payload
    },
    setCustodians: (state, action: PayloadAction<Array<Custodian>>) => {
      state.custodians = action.payload
    },
  },
})
export default custodiansSlice.reducer
export const { setCustodiansLoading, setCustodians } = custodiansSlice.actions

// Selectors
export const selectCustodiansLoading = (state) =>
  state.custodians.custodiansLoading
export const selectCustodians = (state) => state.custodians.custodians
export function selectEmailSenders(state) {
  const custodians = state.custodians.custodians
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian) => {
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
export function selectEmailReceivers(state) {
  const custodians = state.custodians.custodians
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian) => {
      if (custodian.senderTotal) {
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

export function selectEmailSentByCustodian(state) {
  const custodianNameFromId = (id: string) =>
    state.custodians.custodians.find((c) => c.id === id).name

  const custodians = state.custodians.custodians
  const data: Array<[string, string, number]> = []
  const nodes: Array<IDColorKey> = []

  if (custodians) {
    //  create array of [from, to, number sent]
    custodians.forEach((fromCustodian) => {
      fromCustodian.toCustodians.forEach((toCustodian) => {
        data.push([
          fromCustodian.name,
          custodianNameFromId(toCustodian.custodianId),
          toCustodian.total,
        ])
      })
    })
    // and array of color keys
    custodians.forEach((custodian) => {
      nodes.push({ id: custodian.name, color: custodian.color })
    })
  }

  return { data, nodes }
}
