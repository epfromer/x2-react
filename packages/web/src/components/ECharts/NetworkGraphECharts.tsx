import { getNetworkGraphEChartsConfig, selectDarkMode } from '@klonzo/common'
import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'

// https://echarts.apache.org/examples/en/editor.html?c=graph

const chartHeight = '600px'
const chartWidth = '100%'

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
    <div>
      <ReactEcharts
        style={{ height: chartHeight, width: chartWidth }}
        onEvents={{
          click: (e: any) => handleClick(e.data.target, e.data.source),
        }}
        option={getNetworkGraphEChartsConfig(
          useSelector(selectDarkMode),
          title,
          data,
          nodes
        )}
      />
    </div>
  )
}
