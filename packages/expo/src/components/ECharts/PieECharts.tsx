import {
  EmailXferedDatum,
  getPieEChartsConfig,
  selectDarkMode,
} from '@klonzo/common'
import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-pie

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  return (
    <ECharts
      onData={(name: string) => handleClick(search, name)}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      backgroundColor={useSelector(selectDarkMode) ? 'black' : 'white'}
      option={getPieEChartsConfig(useSelector(selectDarkMode), title, data)}
    />
  )
}
