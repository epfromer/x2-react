import { createAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { WordCloudTag } from '../types'

export interface WordCloudState {
  wordCloudLoading: boolean
  wordCloud: Array<WordCloudTag> | undefined
}
const initialState: WordCloudState = {
  wordCloudLoading: false,
  wordCloud: undefined,
}

// Actions
export const setWordCloudLoading = createAction<boolean>(
  'wordCloud/setWordCloudLoading'
)
export const setWordCloud = createAction<Array<WordCloudTag>>(
  'wordCloud/setWordCloud'
)

// Reducer
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

// selectors & getters
export const getWordCloudLoading = (state: RootState): boolean =>
  state.wordCloud.wordCloudLoading
export const getWordCloud = (
  state: RootState
): Array<WordCloudTag> | undefined => state.wordCloud.wordCloud
