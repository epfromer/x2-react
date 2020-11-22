import { createAction, createSlice, Store } from '@reduxjs/toolkit'
import { gql, request } from 'graphql-request'
import { x2Server } from '../../constants'
import { Custodian } from '../types'

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
    // TODO .catch((e) => console.error(e))
    .catch((err) => console.error('getCustodiansAsync: ', err))
}
