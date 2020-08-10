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

const PolarECharts: React.FC<Props> = ({
  title,
  search,
  data,
  handleClick,
}) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const series: Array<any> = data.map((datum) => ({
    value: datum.value,
    name: datum.name,
    itemStyle: {
      color: datum.color,
    },
  }))
  
  return (
    <ReactEcharts
      style={{ height: chartHeight, width: '100%' }}
      onEvents={{
        click: (e: any) => handleClick(search, e.data.name),
      }}
      option={{
        title: {
          text: title,
          left: 'center',
          textStyle: {
            color: darkMode ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
        },
        legend: {
          show: true,
          bottom: 0,
          textStyle: {
            color: darkMode ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'pie',
            data: series,
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: () => Math.random() * 200,
          },
        ],
      }}
    />
  )
}

export default PolarECharts
