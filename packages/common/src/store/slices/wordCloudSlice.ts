import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WordCloudTag } from '../types'

export interface WordCloudState {
  wordCloudLoading: boolean
  wordCloud: Array<WordCloudTag> | undefined
}

const initialState: WordCloudState = {
  wordCloudLoading: false,
  wordCloud: undefined,
}

export const wordCloudSlice = createSlice({
  name: 'wordCloud',
  initialState,
  reducers: {
    setWordCloudLoading: (state, action: PayloadAction<boolean>) => {
      state.wordCloudLoading = action.payload
    },
    setWordCloud: (state, action: PayloadAction<Array<WordCloudTag>>) => {
      state.wordCloud = action.payload
    },
  },
})
export default wordCloudSlice.reducer
export const { setWordCloudLoading, setWordCloud } = wordCloudSlice.actions

// Selectors
export const selectWordCloudLoading = (state) =>
  state.wordCloud.wordCloudLoading
export const selectWordCloud = (state) => state.wordCloud.wordCloud
