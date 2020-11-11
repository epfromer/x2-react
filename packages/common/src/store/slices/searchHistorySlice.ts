import { createAction, createSlice } from '@reduxjs/toolkit'
import { SearchHistoryEntry } from '../types'

export interface searchHistoryState {
  searchHistoryLoading: boolean
  searchHistory: Array<SearchHistoryEntry> | undefined
}
const initialState: searchHistoryState = {
  searchHistoryLoading: false,
  searchHistory: undefined,
}

// Actions
export const setSearchHistoryLoading = createAction<boolean>(
  'searchHistory/setSearchHistoryLoading'
)
export const setSearchHistory = createAction<Array<SearchHistoryEntry>>(
  'searchHistory/setSearchHistory'
)

// Reducer
export const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSearchHistoryLoading, (state, action) => {
        state.searchHistoryLoading = action.payload
      })
      .addCase(setSearchHistory, (state, action) => {
        state.searchHistory = action.payload
      })
  },
})
export default searchHistorySlice.reducer
