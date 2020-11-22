import { getNetworkGraphEChartsConfig } from '@klonzo/common'
import React, { useContext } from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { ThemeContext } from 'react-native-elements'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/editor.html?c=graph

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (to: string, from: string) => void
}
export default function NetworkGraphECharts({
  title,
  data,
  nodes,
  handleClick,
}: Props) {
  const { theme }: any = useContext(ThemeContext)
  return (
    <ECharts
      onData={(o: any) => handleClick(o.target, o.source)}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      backgroundColor={theme.colors.white}
      option={getNetworkGraphEChartsConfig(
        theme.colors.black,
        title,
        data,
        nodes
      )}
    />
  )
}
