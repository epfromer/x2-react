import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  clearSearch,
  getEmailAsync,
  getWordCloud,
  getWordCloudLoading,
  setAllText,
  store,
} from '../common'
import WordCloudECharts from '../components/ECharts/WordCloudECharts'
import WordCloudHighcharts from '../components/Highcharts/WordCloudHighcharts'
import LoadingIndicator from '../components/LoadingIndicator'

export default function WordCloudView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wordCloudLoading = useSelector(getWordCloudLoading)
  const wordCloud = useSelector(getWordCloud)

  function handleClick(word: string) {
    dispatch(clearSearch())
    dispatch(setAllText(word))
    getEmailAsync(store)
    navigate('/SearchView')
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
