import { EmailXferedDatum, RootState } from '@klonzo/common'
import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-bar

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}
export default function BarECharts({ search, data, handleClick }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  interface Datum {
    value: number
    name: string
    itemStyle: any
  }
  const chartData: Array<Datum> = []
  data.forEach((datum) => {
    chartData.push({
      name: datum.name,
      value: datum.value,
      itemStyle: {
        normal: {
          color: datum.color,
          lineStyle: {
            color: datum.color,
          },
          areaStyle: {
            color: datum.color,
          },
        },
      },
    })
  })

  chartData.reverse()

  return (
    <ECharts
      onData={(o: any) => handleClick(search, o.name)}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      backgroundColor={darkMode ? 'black' : 'white'}
      option={{
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: 100,
        },
        xAxis: {
          axisLabel: {
            color: darkMode ? 'white' : 'black',
          },
        },
        yAxis: {
          data: chartData.map((datum) => datum.name),
          axisLabel: {
            color: darkMode ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'bar',
            data: chartData,
          },
        ],
      }}
    />
  )
}
