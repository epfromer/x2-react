import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'

// https://www.npmjs.com/package/react-native-echarts-wrapper

interface Props {
  title: string
  search: string
  data: any
  handleClick: (search: string, name: string) => void
}
export default function TreeMapECharts({ search, data, handleClick }: Props) {
  const chartData: Array<any> = data.map((datum: any) => ({
    name: datum.name,
    value: datum.value,
    itemStyle: {
      color: datum.color,
    },
  }))

  return (
    <ECharts
      onData={(name: string) => handleClick(search, name)}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      option={{
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}',
        },
        series: [
          {
            type: 'treemap',
            data: chartData,
          },
        ],
      }}
    />
  )
}
