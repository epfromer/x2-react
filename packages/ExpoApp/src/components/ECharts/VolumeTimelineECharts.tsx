import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { RootState, TotalEmailSentDatum } from '../../store/types'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// TODO fix click handler

interface Props {
  title: string
  data: Array<TotalEmailSentDatum>
  handleClick: (date: string) => void
}

export default function VolumeTimelineECharts({ data, handleClick }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  // function onData(name: string) {
  //   console.log(name)
  //   // data[0].handleClick(search, name)
  // }

  return (
    <ECharts
      onData={() => console.log('foo')}
      additionalCode={`chart.on('click', p => sendData(p));`}
      backgroundColor={darkMode ? 'black' : 'white'}
      option={{
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          bottom: 90,
        },
        dataZoom: [
          {
            type: 'inside',
          },
          {
            type: 'slider',
          },
        ],
        xAxis: {
          data: data.map((datum) => datum.sent),
          silent: false,
          splitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLabel: {
            color: darkMode ? 'white' : 'black',
          },
        },
        yAxis: {
          splitArea: {
            show: false,
          },
          axisLabel: {
            color: darkMode ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'bar',
            data: data.map((datum) => datum.value),
          },
        ],
      }}
    />
  )
}
