import { EmailXferedDatum, getPieEChartsConfig } from '@klonzo/common'
import React, { useContext } from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { ThemeContext } from 'react-native-elements'

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
  const { theme }: any = useContext(ThemeContext)
  return (
    <ECharts
      onData={(name: string) => handleClick(search, name)}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      backgroundColor={theme.colors.white}
      option={getPieEChartsConfig(theme.colors.white, title, data)}
    />
  )
}
