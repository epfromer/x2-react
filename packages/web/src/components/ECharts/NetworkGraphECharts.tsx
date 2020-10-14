import { getNetworkGraphEChartsConfig } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import ReactEcharts from 'echarts-for-react'
import React from 'react'

// https://echarts.apache.org/examples/en/editor.html?c=graph

const chartHeight = '600px'
const chartWidth = '100%'

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
  const theme = useTheme()
  return (
    <div>
      <ReactEcharts
        style={{ height: chartHeight, width: chartWidth }}
        option={getNetworkGraphEChartsConfig(
          theme.palette.text.primary,
          title,
          data,
          nodes
        )}
      />
      <button hidden data-testid="network-graph-echarts"></button>
    </div>
  )
}
