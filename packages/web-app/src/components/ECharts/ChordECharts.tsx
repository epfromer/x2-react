import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
require('echarts-wordcloud')

// https://echarts.apache.org/examples/en/index.html#chart-type-graph

const chartHeight = '900px'

interface Props {
  title: string
  data: Array<[string, string, number]>
  nodes: Array<any>
  handleClick: (from: string, to: string) => void
}

const ChordECharts: React.FC<Props> = ({ title, data, nodes, handleClick }) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const maxSent = nodes.reduce((maxVal, cur) =>
    cur.emailTotal > maxVal.emailTotal ? cur : maxVal
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

export default ChordECharts
