import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-bar
// TODO fix y axis lable truncation
// TODO fix click handler

interface Props {
  title: string
  data: any
}

export default function PolarECharts({ title, data }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const series: any = data.map((datum: any) => ({
    value: datum.value,
    name: datum.name,
    itemStyle: {
      color: datum.color,
    },
    handleClick: datum.handleClick,
  }))

  function onData(name: string) {
    console.log(name)
    // data[0].handleClick(search, name)
  }

  return (
    <ECharts
      onData={onData}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
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
