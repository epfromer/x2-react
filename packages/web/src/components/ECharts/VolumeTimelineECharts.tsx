import {
  getVolumeTimelineEChartsConfig,
  selectDarkMode,
  TotalEmailSentDatum,
} from '@klonzo/common'
import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'

// https://echarts.apache.org/examples/en/index.html#chart-type-bar

const chartHeight = '500px'
const chartWidth = '100%'

interface Props {
  title: string
  data: Array<TotalEmailSentDatum>
  handleClick: (date: string) => void
}
export default function VolumeTimelineECharts({
  title,
  data,
  handleClick,
}: Props) {
  return (
    <ReactEcharts
      style={{ height: chartHeight, width: chartWidth }}
      onEvents={{
        click: (e: any) => handleClick(e.name),
      }}
      option={getVolumeTimelineEChartsConfig(
        useSelector(selectDarkMode),
        title,
        data
      )}
    />
  )
}
