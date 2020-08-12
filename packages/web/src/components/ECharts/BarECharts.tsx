import {
  EmailXferedDatum,
  getBarEChartsConfig,
  RootState,
} from '@klonzo/common'
import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'

// https://echarts.apache.org/examples/en/index.html#chart-type-bar

const chartHeight = '300px'
const chartWidth = '110%'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}
export default function BarECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  return (
    <ReactEcharts
      style={{ height: chartHeight, width: chartWidth }}
      onEvents={{
        click: (e: any) => handleClick(search, e.name),
      }}
      option={getBarEChartsConfig(
        useSelector((state: RootState) => state.darkMode),
        title,
        data,
        {}
      )}
    />
  )
}
