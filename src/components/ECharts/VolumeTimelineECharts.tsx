import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// TODO fix click handler

interface Datum {
  sent: string
  value: number
}

interface Props {
  title: string
  data: Array<Datum>
  handleClick: (date: string) => void
}

export default function VolumeTimelineECharts({
  title,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  const labels: Array<string> = []
  const emailsSent: Array<number> = []
  data.forEach((stat) => {
    labels.push(stat.sent)
    emailsSent.push(stat.value)
  })

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
          data: labels,
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
            color: themePrimaryColor,
            data: emailsSent,
          },
        ],
      }}
    />
  )
}
