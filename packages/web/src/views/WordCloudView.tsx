import {
  clearSearch,
  getEmailAsync,
  selectWordCloud,
  selectWordCloudLoading,
  setAllText,
} from '@klonzo/common'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import WordCloudECharts from '../components/ECharts/WordCloudECharts'
import WordCloudHighcharts from '../components/Highcharts/WordCloudHighcharts'

export default function WordCloudView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const wordCloudLoading = useSelector(selectWordCloudLoading)
  const wordCloud = useSelector(selectWordCloud)

  function handleClick(word: string) {
    dispatch(clearSearch())
    dispatch(setAllText(word))
    getEmailAsync()
    history.push('/SearchView')
  }

  const data: any = []
  wordCloud?.forEach((word: any) =>
    data.push({ name: word.tag, weight: word.weight })
  )

  return (
    <div>
      {wordCloudLoading && <LinearProgress />}
      {wordCloud && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <WordCloudHighcharts
            title="Enron Project Names"
            words={data}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <WordCloudECharts
            title="Enron Project Names"
            words={data}
            handleClick={handleClick}
          />
        </div>
      )}
      <button hidden onClick={() => handleClick('foo')} data-testid="handle-click">
      </button>
    </div>
  )
}
