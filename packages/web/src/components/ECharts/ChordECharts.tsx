import { selectDarkMode } from '@klonzo/common'
import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'
require('echarts-wordcloud')

// https://echarts.apache.org/examples/en/index.html#chart-type-graph

const chartHeight = '900px'

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
  const darkMode = useSelector(selectDarkMode)
  const maxSent = nodes.reduce(
    (maxVal, cur) => (cur.emailTotal > maxVal.emailTotal ? cur : maxVal),
    0
  ).emailTotal
  const chartNodes: Array<any> = nodes.map((node) => ({
    id: node.id,
    name: node.id,
    category: node.id,
    symbolSize: (node.emailTotal / maxSent) * 40 + 10,
    itemStyle: {
      color: node.color,
    },
    label: {
      normal: {
        show: true,
      },
    },
  }))
  const links: Array<any> = data.map((datum) => ({
    source: datum[0],
    target: datum[1],
    value: datum[2],
  }))

  return (
    <ReactEcharts
      style={{ height: chartHeight, width: '100%' }}
      onEvents={{
        click: (e: any) => handleClick(e.data.source, e.data.target),
      }}
      option={{
        title: {
          text: title,
          left: 'center',
          textStyle: {
            color: darkMode ? 'white' : 'black',
          },
        },
        tooltip: {},
        legend: [
          {
            top: 40,
            textStyle: {
              color: darkMode ? 'white' : 'black',
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
            links: links,
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
