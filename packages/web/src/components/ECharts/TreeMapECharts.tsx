import { getTreeMapEChartsConfig, RootState } from '@klonzo/common'
import ReactEcharts from 'echarts-for-react'
import React from 'react'
import { useSelector } from 'react-redux'

// https://echarts.apache.org/examples/en/index.html#chart-type-treemap

const chartHeight = '450px'

interface Props {
  title: string
  search: string
  data: any
  handleClick: (search: string, name: string) => void
}
export default function TreeMapECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
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
      option={getTreeMapEChartsConfig(
        useSelector((state: RootState) => state.darkMode),
        title,
        data
      )}
    />
  )
}
