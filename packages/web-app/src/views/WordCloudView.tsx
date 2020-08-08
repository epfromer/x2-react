import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import {
  clearSearch,
  fetchAndCache,
  RootState,
  setReduxState,
} from '@x2react/shared'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import WordCloudECharts from '../components/ECharts/WordCloudECharts'
import WordCloudHighcharts from '../components/Highcharts/WordCloudHighcharts'

export default function WordCloudView() {
  const history = useHistory()
  const wordCloudLoading = useSelector(
    (state: RootState) => state.wordCloudLoading
  )
  const wordCloud = useSelector((state: RootState) => state.wordCloud)

  function handleClick(word: string) {
    clearSearch()
    setReduxState('allText', word)
    fetchAndCache('emails')
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
      <button hidden onClick={() => handleClick('foo')}>
        handleClick
      </button>
    </div>
  )
}
