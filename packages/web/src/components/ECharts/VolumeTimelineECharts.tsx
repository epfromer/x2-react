import {
  getVolumeTimelineEChartsConfig,
  selectDarkMode,
  EmailSentByDayDatum,
} from '@klonzo/common'
import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'

// https://echarts.apache.org/examples/en/index.html#chart-type-bar

const chartHeight = '500px'
const chartWidth = '100%'

interface Props {
  title: string
  data: Array<EmailSentByDayDatum>
  handleClick: (date: string) => void
}
export default function VolumeTimelineECharts({
  title,
  data,
  handleClick,
}: Props) {
  const onClick = (e: any) => handleClick(e.name)

  return (
    <div>
      <ReactEcharts
        style={{ height: chartHeight, width: chartWidth }}
        onEvents={{ click: onClick }}
        option={getVolumeTimelineEChartsConfig(
          useSelector(selectDarkMode),
          title,
          data
        )}
      />
      <button
        hidden
        onClick={onClick}
        data-testid="volume-timeline-echarts"
      ></button>
    </div>
  )
}
