import { EmailXferedDatum, getBarEChartsConfig } from '@klonzo/common'
import React, { useContext } from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { ThemeContext } from 'react-native-elements'

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
  const { theme }: any = useContext(ThemeContext)
  return (
    <ECharts
      onData={(o: any) => handleClick(search, o.name)}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      backgroundColor={theme.colors.white}
      option={getBarEChartsConfig(
        theme.colors.black,
        title,
        data.map((datum) => datum).reverse(),
        { left: 100 }
      )}
    />
  )
}
