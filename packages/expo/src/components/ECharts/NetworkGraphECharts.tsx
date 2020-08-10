import { RootState } from '@klonzo/common'
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
  data,
  nodes,
  handleClick,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  const maxSent = nodes?.reduce(
    (maxVal, cur) => (cur.emailTotal > maxVal.emailTotal ? cur : maxVal),
    { emailTotal: 0 }
  ).emailTotal
  const chartNodes: Array<any> = nodes?.map((node) => ({
    id: node.id,
    name: node.id,
    category: node.id,
    x: null,
    y: null,
    draggable: true,
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
  const links: Array<any> = data?.map((datum) => ({
    source: datum[0],
    target: datum[1],
    value: datum[2],
  }))

  return (
    <ECharts
      onData={(o: any) => handleClick(o.target, o.source)}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      backgroundColor={darkMode ? 'black' : 'white'}
      option={{
        tooltip: {},
        legend: [
          {
            bottom: 0,
            data: chartNodes.map((a) => a.name),
            textStyle: {
              color: darkMode ? 'white' : 'black',
            },
          },
        ],
        animation: false,
        series: [
          {
            top: 50,
            left: 50,
            right: 50,
            bottom: 250,
            type: 'graph',
            layout: 'force',
            data: chartNodes,
            links: links,
            categories: chartNodes,
            roam: true,
            label: {
              position: 'bottom',
              formatter: '{b}',
            },
            force: {
              repulsion: 2700,
            },
          },
        ],
      }}
    />
  )
}
