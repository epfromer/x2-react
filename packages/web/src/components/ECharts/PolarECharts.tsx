import {
  EmailXferedDatum,
  getPolarEChartsConfig,
  RootState,
} from '@klonzo/common'
import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'

// https://echarts.apache.org/examples/en/index.html#chart-type-pie

const chartHeight = '600px'
const chartWidth = '100%'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PolarECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  return (
    <ReactEcharts
      style={{ height: chartHeight, width: chartWidth }}
      onEvents={{
        click: (e: any) => handleClick(search, e.data.name),
      }}
      option={getPolarEChartsConfig(
        useSelector((state: RootState) => state.darkMode),
        title,
        data
      )}
    />
  )
}
