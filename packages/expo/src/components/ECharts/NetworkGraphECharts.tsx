import { getNetworkGraphEChartsConfig, selectDarkMode } from '@klonzo/common'
import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/editor.html?c=graph

interface Props {
  title: string
  data: Array<[string, string, number]>
  nodes: Array<any>
  handleClick: (to: string, from: string) => void
}
export default function NetworkGraphECharts({
  title,
  data,
  nodes,
  handleClick,
}: Props) {
  return (
    <ECharts
      onData={(o: any) => handleClick(o.target, o.source)}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      backgroundColor={useSelector(selectDarkMode) ? 'black' : 'white'}
      option={getNetworkGraphEChartsConfig(
        useSelector(selectDarkMode),
        title,
        data,
        nodes
      )}
    />
  )
}
