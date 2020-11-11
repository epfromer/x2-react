import { createAction, createSlice } from '@reduxjs/toolkit'
import { Custodian } from '../types'

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
