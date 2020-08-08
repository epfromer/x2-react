import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import WordCloudECharts from '../components/ECharts/WordCloudECharts'
import WordCloudHighcharts from '../components/Highcharts/WordCloudHighcharts'
import { fetchAndCache } from './../store'
import { RootState } from './../store/types'

export default function WordCloudView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const wordCloudLoading = useSelector(
    (state: RootState) => state.wordCloudLoading
  )
  const wordCloud = useSelector((state: RootState) => state.wordCloud)

  function handleClick(word: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({ type: 'setReduxState', key: 'allText', value: word })
    fetchAndCache('emails')
    history.push('/SearchView')
  }

  const data: any = []
  wordCloud?.forEach((word) =>
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
