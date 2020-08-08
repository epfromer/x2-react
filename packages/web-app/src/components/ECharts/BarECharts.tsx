import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { EmailXferedDatum, RootState } from '../../store/types'

// https://echarts.apache.org/examples/en/index.html#chart-type-bar

const chartHeight = '300px'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}

const BarECharts: React.FC<Props> = ({ title, search, data, handleClick }) => {
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

  return (
    <ReactEcharts
      style={{ height: chartHeight, width: '110%' }}
      onEvents={{
        click: (e: any) => handleClick(search, e.name),
      }}
      option={{
        title: {
          text: title,
          top: 20,
          left: 'center',
          textStyle: {
            color: darkMode ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          bottom: 90,
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

export default BarECharts
