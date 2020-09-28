import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchHistoryEntry } from '../types'

export interface searchHistoryState {
  searchHistoryLoading: boolean
  searchHistory: Array<SearchHistoryEntry> | undefined
}

const initialState: searchHistoryState = {
  searchHistoryLoading: false,
  searchHistory: undefined,
}

export const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    setSearchHistoryLoading: (state, action: PayloadAction<boolean>) => {
      state.searchHistoryLoading = action.payload
    },
    setSearchHistory: (
      state,
      action: PayloadAction<Array<SearchHistoryEntry>>
    ) => {
      state.searchHistory = action.payload
    },
  },
})
export default searchHistorySlice.reducer
export const {
  setSearchHistoryLoading,
  setSearchHistory,
} = searchHistorySlice.actions

// Selectors
export const selectSearchHistoryLoading = (state) =>
  state.searchHistory.searchHistoryLoading
export const selectSearchHistory = (state) => state.searchHistory.searchHistory
