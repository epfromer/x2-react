import {
  EmailXferedDatum,
  getPolarEChartsConfig,
  RootState,
} from '@klonzo/common'
import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-bar

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PolarECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  return (
    <ECharts
      onData={(name: string) => handleClick(search, name)}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      backgroundColor={
        useSelector((state: RootState) => state.darkMode) ? 'black' : 'white'
      }
      option={getPolarEChartsConfig(
        useSelector((state: RootState) => state.darkMode),
        title,
        data
      )}
    />
  )
}
