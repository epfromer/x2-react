import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// TODO fix click handler

interface Props {
  title: string
  search: string
  data: any
  handleClick: (search: string, name: string) => void
}

export default function TreeMapECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const chartData: Array<any> = data.map((datum: any) => ({
    name: datum.name,
    value: datum.value,
    itemStyle: {
      color: datum.color,
    },
  }))

  function onData(name: string) {
    console.log(name)
    // data[0].handleClick(search, name)
  }

  return (
    <ECharts
      onData={onData}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
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
