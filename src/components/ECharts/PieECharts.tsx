import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-pie
// TODO fix click handler

interface Contact {
  name: string
  total: number
  color: string
  handleClick: (field: string, name: string) => void
}

interface Props {
  title: string
  search: string
  data: Array<Contact>
}

export default function PieECharts({ title, search, data }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  function onData(name: string) {
    data[0].handleClick(search, name)
  }

  interface EChartsDatum {
    value: number
    name: string
    itemStyle: any
  }

  const contacts: Array<EChartsDatum> = []
  data.forEach((datum) => {
    contacts.push({
      name: datum.name,
      value: datum.total,
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
    <ECharts
      onData={onData}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
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
            data: contacts,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function () {
              return Math.random() * 200
            },
          },
        ],
      }}
    />
  )
}
