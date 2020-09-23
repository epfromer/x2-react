import {
  getVolumeTimeHighchartsConfig,
  selectDarkMode,
  EmailSentByDay,
} from '@klonzo/common'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { useSelector } from 'react-redux'

// https://www.highcharts.com/demo/line-time-series

interface Props {
  title: string
  data: Array<EmailSentByDay>
  handleClick: (date: string) => void
}
export default function VolumeTimelineHighcharts({
  title,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector(selectDarkMode)
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getVolumeTimeHighchartsConfig(
        darkMode,
        title,
        data,
        darkMode ? '#303030' : '#FAFAFA',
        handleClick
      )}
    />
  )
}
