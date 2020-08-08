import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { EmailXferedDatum, RootState } from '../../store/types'

// https://echarts.apache.org/examples/en/index.html#chart-type-pie

const chartHeight = '600px'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}

const PieECharts: React.FC<Props> = ({ title, search, data, handleClick }) => {
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
      style={{ height: chartHeight }}
      onEvents={{
        click: (e: any) => handleClick(search, e.data.name),
      }}
      option={{
        title: {
          text: title,
          left: 'center',
          top: 20,
          textStyle: {
            color: darkMode ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            data: chartData,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: () => Math.random() * 200,
          },
        ],
      }}
    />
  )
}

export default PieECharts
