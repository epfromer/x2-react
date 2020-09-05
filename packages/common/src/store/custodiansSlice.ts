import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Custodian, EmailSentStat, EmailXferedDatum } from './types'

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
  const data: Array<EmailXferedDatum> = []
  if (state.custodians.custodians) {
    state.custodians.custodians.forEach((custodian) => {
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
  const data: Array<EmailXferedDatum> = []
  if (state.custodians.custodians) {
    state.custodians.custodians.forEach((custodian) => {
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
export function selectEmailSentByCustodian(state) {
  //  create array of [from, to, number sent]
  const data: Array<[string, string, number]> = []
  if (state.custodians.custodians) {
    state.custodians.custodians.forEach((custodian) => {
      const sent = new Map()
      custodian.toCustodians.forEach((email) => {
        email.to.forEach((recipient) => {
          if (sent.has(recipient)) {
            sent.set(recipient, sent.get(recipient) + 1)
          } else {
            sent.set(recipient, 1)
          }
        })
      })
      sent.forEach((v, k) => {
        if (custodian.name !== k) {
          data.push([custodian.name, k, v])
        }
      })
    })
  }

  const emailTotal = new Map()
  data.forEach((custodian) => {
    if (emailTotal.has(custodian[0])) {
      emailTotal.set(custodian[0], emailTotal.get(custodian[0]) + custodian[2])
    } else {
      emailTotal.set(custodian[0], custodian[2])
    }
    if (emailTotal.has(custodian[1])) {
      emailTotal.set(custodian[1], emailTotal.get(custodian[1]) + custodian[2])
    } else {
      emailTotal.set(custodian[1], custodian[2])
    }
  })

  const nodes: Array<EmailSentStat> = []
  if (state.custodians.custodians) {
    state.custodians.custodians.forEach((custodian) => {
      nodes.push({
        id: custodian.name,
        color: custodian.color,
        emailTotal: emailTotal.get(custodian.name),
      })
    })
  }

  return { data, nodes }
}
