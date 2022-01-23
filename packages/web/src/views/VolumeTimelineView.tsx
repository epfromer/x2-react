import {
  clearSearch,
  getEmailAsync,
  getEmailSentByDay,
  getEmailSentByDayLoading,
  setSent,
  store,
} from '@klonzo/common'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import VolumeTimelineChartJS from '../components/ChartJS/VolumeTimelineChartJS'
import VolumeTimelineECharts from '../components/ECharts/VolumeTimelineECharts'
import VolumeTimelineHighcharts from '../components/Highcharts/VolumeTimelineHighcharts'
import LoadingIndicator from '../components/LoadingIndicator'
import VolumeTimelineVictory from '../components/Victory/VolumeTimelineVictory'

export default function TimelineView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emailSentByDayLoading = useSelector(getEmailSentByDayLoading)
  const emailSentByDay = useSelector(getEmailSentByDay)

  function handleClick(date: string) {
    dispatch(clearSearch())
    dispatch(setSent(date))
    getEmailAsync(store)
    navigate('/SearchView')
  }

  return (
    <div>
      {emailSentByDayLoading && <LoadingIndicator />}
      {emailSentByDay && (
        <div>
          <Typography variant="h5">Highcharts</Typography>
          <VolumeTimelineHighcharts
            title="Email Volume per Day"
            data={emailSentByDay}
            handleClick={handleClick}
          />
          <Typography variant="h5">ChartJS</Typography>
          <VolumeTimelineChartJS
            title="Email Volume per Day"
            data={emailSentByDay}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <VolumeTimelineECharts
            title="Email Volume per Day"
            data={emailSentByDay}
            handleClick={handleClick}
          />
          <Typography variant="h5">Victory</Typography>
          <VolumeTimelineVictory
            title="Email Volume per Day"
            data={emailSentByDay}
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
