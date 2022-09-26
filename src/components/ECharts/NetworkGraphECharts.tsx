import { useTheme } from '@mui/material/styles'
import ReactEcharts from 'echarts-for-react'
import { getNetworkGraphEChartsConfig } from '../../common'

// https://echarts.apache.org/examples/en/editor.html?c=graph

const chartHeight = '400px'

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
  const onClick = (e: any) => {
    handleClick(e.data.source, e.data.target)
  }

  return (
    <div>
      <ReactEcharts
        style={{ height: chartHeight }}
        onEvents={{ click: onClick }}
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
