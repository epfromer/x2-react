import { EmailXferedDatum, getPieEChartsConfig } from '@klonzo/common'
import ReactEcharts from 'echarts-for-react'
import React from 'react'

// https://echarts.apache.org/examples/en/index.html#chart-type-pie

const chartHeight = '600px'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}

export default function PieECharts({ search, data, handleClick }: Props) {
  return (
    <ReactEcharts
      style={{ height: chartHeight }}
      onEvents={{
        click: (e: any) => handleClick(search, e.data.name),
      }}
      option={getPieEChartsConfig(data)}
    />
  )
}
