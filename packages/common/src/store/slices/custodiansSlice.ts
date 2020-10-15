import { createAction, createSlice } from '@reduxjs/toolkit'
import { Custodian, EmailXferedDatum } from '../types'

export interface CustodiansState {
  custodiansLoading: boolean
  custodians: Array<Custodian> | undefined
}
const initialState: CustodiansState = {
  custodiansLoading: false,
  custodians: undefined,
}

export const setCustodiansLoading = createAction<boolean>(
  'custodians/setCustodiansLoading'
)
export const setCustodians = createAction<Array<Custodian>>(
  'custodians/setCustodians'
)

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

// Selectors
export const selectCustodiansLoading = (state: any) =>
  state.custodians.custodiansLoading
export const selectCustodians = (state: any) => state.custodians.custodians
export function selectEmailSenders(state: any) {
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
export function selectEmailReceivers(state: any) {
  const custodians = state.custodians.custodians
  const data: Array<EmailXferedDatum> = []
  if (custodians) {
    custodians.forEach((custodian: Custodian) => {
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

export function selectEmailSentByCustodian(state: any) {
  const custodianNameFromId = (id: string) =>
    state.custodians.custodians.find((c: Custodian) => c.id === id).name

  const custodians = state.custodians.custodians
  const data: Array<any> = []
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
