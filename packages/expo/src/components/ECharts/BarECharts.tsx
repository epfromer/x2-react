import {
  EmailXferedDatum,
  getBarEChartsConfig,
  selectDarkMode,
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
  handleClick: (key: string, value: string) => void
}
export default function BarECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  return (
    <ECharts
      onData={(o: any) => handleClick(search, o.name)}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      backgroundColor={useSelector(selectDarkMode) ? 'black' : 'white'}
      option={getBarEChartsConfig(
        useSelector(selectDarkMode),
        title,
        data.map((datum) => datum).reverse(),
        { left: 100 }
      )}
    />
  )
}
