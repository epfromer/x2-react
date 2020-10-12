import { createAction, createSlice } from '@reduxjs/toolkit'
import { WordCloudTag } from '../types'

export interface WordCloudState {
  wordCloudLoading: boolean
  wordCloud: Array<WordCloudTag> | undefined
}
const initialState: WordCloudState = {
  wordCloudLoading: false,
  wordCloud: undefined,
}

export const setWordCloudLoading = createAction<boolean>(
  'wordCloud/setWordCloudLoading'
)
export const setWordCloud = createAction<Array<WordCloudTag>>(
  'wordCloud/setWordCloud'
)

export const wordCloudSlice = createSlice({
  name: 'wordCloud',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setWordCloudLoading, (state, action) => {
        state.wordCloudLoading = action.payload
      })
      .addCase(setWordCloud, (state, action) => {
        state.wordCloud = action.payload
      })
  },
})
export default wordCloudSlice.reducer

// Selectors
export const selectWordCloudLoading = (state) =>
  state.wordCloud.wordCloudLoading
export const selectWordCloud = (state) => state.wordCloud.wordCloud
