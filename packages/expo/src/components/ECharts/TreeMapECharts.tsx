import {
  blackBackground,
  getDarkMode,
  getTreeMapEChartsConfig,
} from '@klonzo/common'
import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-treemap

interface Props {
  title: string
  search: string
  data: any
  handleClick: (search: string, name: string) => void
}
export default function TreeMapECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector(getDarkMode)

  return (
    <ECharts
      onData={(name: string) => handleClick(search, name)}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      backgroundColor={darkMode ? blackBackground : 'white'}
      option={getTreeMapEChartsConfig(
        darkMode ? 'white' : 'black',
        title,
        data
      )}
    />
  )
}
