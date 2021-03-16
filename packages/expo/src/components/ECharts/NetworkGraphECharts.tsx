import {
  blackBackground,
  getDarkMode,
  getNetworkGraphEChartsConfig,
} from '@klonzo/common'
import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'

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
  const darkMode = useSelector(getDarkMode)

  return (
    <ECharts
      onData={(o: any) => handleClick(o.target, o.source)}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      backgroundColor={darkMode ? blackBackground : 'white'}
      option={getNetworkGraphEChartsConfig(
        darkMode ? 'white' : 'black',
        title,
        data,
        nodes
      )}
    />
  )
}
