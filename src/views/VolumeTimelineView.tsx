import {
  clearSearch,
  getEmailAsync,
  getEmailSentByDay,
  getEmailSentByDayLoading,
  setSent,
  store,
} from '@klonzo/common'
import { Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import VolumeTimelineECharts from '../../../../src/components/ECharts/VolumeTimelineECharts'
import VolumeTimelineHighcharts from '../../../../src/components/Highcharts/VolumeTimelineHighcharts'
import LoadingIndicator from '../../../../src/components/LoadingIndicator'
import VolumeTimelineVictory from '../../../../src/components/Victory/VolumeTimelineVictory'

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
