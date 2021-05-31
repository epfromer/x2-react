import { useTheme } from '@material-ui/core/styles'
import ReactEcharts from 'echarts-for-react'
import 'echarts-wordcloud'
import React from 'react'

// https://echarts.apache.org/examples/en/index.html#chart-type-graph

const chartHeight = '400px'

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (from: string, to: string) => void
}
export default function ChordECharts({
  title,
  data,
  nodes,
  handleClick,
}: Props) {
  const theme = useTheme()
  const chartNodes: Array<any> = nodes.map((node) => ({
    id: node.id,
    name: node.id,
    category: node.id,
    itemStyle: { color: node.color },
    label: { show: true },
  }))

  return (
    <ReactEcharts
      style={{ height: chartHeight }}
      onEvents={{
        click: (e: any) => handleClick(e.data.source, e.data.target),
      }}
      option={{
        title: {
          text: title,
          left: 'center',
          textStyle: {
            color: theme.palette.text.primary,
          },
        },
        tooltip: {},
        legend: [
          {
            orient: 'vertical',
            x: 'left',
            y: 'center',
            padding: [0, 0, 0, 0],
            textStyle: {
              color: theme.palette.text.primary,
            },
            data: chartNodes.map((a) => a.name),
          },
        ],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: title,
            top: 50,
            left: 50,
            right: 50,
            type: 'graph',
            layout: 'circular',
            data: chartNodes,
            links: data,
            categories: chartNodes,
            roam: true,
            label: {
              position: 'bottom',
              formatter: '{b}',
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
            },
          },
        ],
      }}
    />
  )
}
