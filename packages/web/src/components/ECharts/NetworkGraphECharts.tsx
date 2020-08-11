import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, getNetworkGraphEChartsConfig } from '@klonzo/common'

// https://echarts.apache.org/examples/en/editor.html?c=graph

const chartHeight = '600px'
const chartWidth = '100%'

interface Props {
  title: string
  data: Array<[string, string, number]>
  nodes: Array<any>
  handleClick: (to: string, from: string) => void
}
const NetworkGraphECharts: React.FC<Props> = ({
  title,
  data,
  nodes,
  handleClick,
}) => {
  return (
    <div>
      <ReactEcharts
        style={{ height: chartHeight, width: chartWidth }}
        onEvents={{
          click: (e: any) => handleClick(e.data.target, e.data.source),
        }}
        option={getNetworkGraphEChartsConfig(
          useSelector((state: RootState) => state.darkMode),
          title,
          data,
          nodes
        )}
      />
    </div>
  )
}

export default NetworkGraphECharts
