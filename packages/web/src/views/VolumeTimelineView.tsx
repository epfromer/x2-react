import {
  clearSearch,
  selectEmailSent,
  selectEmailSentLoading,
  setReduxState,
  TotalEmailSentDatum,
} from '@klonzo/common'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import VolumeTimelineChartJS from '../components/ChartJS/VolumeTimelineChartJS'
import VolumeTimelineECharts from '../components/ECharts/VolumeTimelineECharts'
import VolumeTimelineHighcharts from '../components/Highcharts/VolumeTimelineHighcharts'
import VolumeTimelineVictory from '../components/Victory/VolumeTimelineVictory'

export default function TimelineView() {
  const history = useHistory()
  const emailSentLoading = useSelector(selectEmailSentLoading)
  const emailSent = useSelector(selectEmailSent)

  function handleClick(date: string) {
    clearSearch()
    setReduxState('sent', date)
    // fetchAndCache('emails')
    history.push('/SearchView')
  }

  let data: Array<TotalEmailSentDatum> = []
  if (emailSent) {
    data = emailSent.map((stat: any) => ({
      sent: stat.sent,
      value: stat.ids.length,
    }))
  }

  return (
    <div>
      {emailSentLoading && <LinearProgress />}
      {emailSent && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <VolumeTimelineHighcharts
            title="Senders / Receivers"
            data={data}
            handleClick={handleClick}
          />
          <Typography variant="h5">ChartJS</Typography>
          <VolumeTimelineChartJS
            title="Senders / Receivers"
            data={data}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <VolumeTimelineECharts
            title="Senders / Receivers"
            data={data}
            handleClick={handleClick}
          />
          <Typography variant="h5">Victory</Typography>
          <VolumeTimelineVictory
            title="Senders / Receivers"
            data={data}
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
