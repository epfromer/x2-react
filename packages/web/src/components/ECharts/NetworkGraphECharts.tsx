import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

// https://echarts.apache.org/examples/en/editor.html?c=graph

const chartHeight = '600px'

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
    <div>
      <ReactEcharts
        style={{ height: chartHeight, width: '100%' }}
        onEvents={{
          click: (e: any) => handleClick(e.data.target, e.data.source),
        }}
        option={{
          title: {
            text: title,
            top: 20,
            left: 'center',
            textStyle: {
              color: darkMode ? 'white' : 'black',
            },
          },
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
              name: title,
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
    </div>
  )
}

export default NetworkGraphECharts
