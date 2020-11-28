import {
  clearSearch,
  getEmailAsync,
  getWordCloud,
  getWordCloudLoading,
  setAllText,
  store,
} from '@klonzo/common'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'
import WordCloudECharts from '../components/ECharts/WordCloudECharts'
import WordCloudHighcharts from '../components/Highcharts/WordCloudHighcharts'

export default function WordCloudView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const wordCloudLoading = useSelector(getWordCloudLoading)
  const wordCloud = useSelector(getWordCloud)

  function handleClick(word: string) {
    dispatch(clearSearch())
    dispatch(setAllText(word))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  return (
    <div>
      {wordCloudLoading && <LoadingIndicator />}
      {wordCloud && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <WordCloudHighcharts
            title="Enron Project Names"
            data={wordCloud}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <WordCloudECharts
            title="Enron Project Names"
            data={wordCloud}
            handleClick={handleClick}
          />
        </div>
      )}
      <button
        hidden
        onClick={() => handleClick('foo')}
        data-testid="handle-click"
      ></button>
    </div>
  )
}
