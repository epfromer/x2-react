import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EMAIL_SERVER } from '../constants'
import { RootState, store } from './index'
import { WordCloudTag } from './types'

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
export const selectWordCloudLoading = (state: RootState) =>
  state.wordCloud.wordCloudLoading
export const selectWordCloud = (state: RootState) => state.wordCloud.wordCloud

// Aync actions
export async function getWordCloudAsync() {
  store.dispatch(setWordCloudLoading(true))
  fetch(`${EMAIL_SERVER}/wordCloud`)
    .then((resp) => resp.json())
    .then((json) => store.dispatch(setWordCloud(json)))
    .then(() => store.dispatch(setWordCloudLoading(false)))
    .catch((error) => console.error('getWordCloudAsync: ', error))
}
