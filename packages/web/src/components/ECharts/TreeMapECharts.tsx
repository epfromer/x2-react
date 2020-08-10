import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

// https://echarts.apache.org/examples/en/index.html#chart-type-treemap

const chartHeight = '450px'

interface Props {
  title: string
  search: string
  data: any
  handleClick: (search: string, name: string) => void
}
const TreeMapECharts: React.FC<Props> = ({
  title,
  search,
  data,
  handleClick,
}) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const chartData: Array<any> = data.map((datum: any) => ({
    name: datum.name,
    value: datum.value,
    itemStyle: {
      color: datum.color,
    },
  }))

  return (
    <ReactEcharts
      style={{ height: chartHeight }}
      onEvents={{
        click: (e: any) => {
          // navigate on click to breadcrumb, not map
          // TODO - how to determine breadcrumb click?
          if (e.hasOwnProperty('data')) return
          if (e.nodeData.name) handleClick(search, e.nodeData.name)
        },
      }}
      option={{
        title: {
          text: title,
          left: 'center',
          textStyle: {
            color: darkMode ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}',
        },
        series: [
          {
            type: 'treemap',
            data: chartData,
          },
        ],
      }}
    />
  )
}

export default TreeMapECharts
