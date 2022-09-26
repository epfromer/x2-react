import { useTheme } from '@mui/material/styles'
import ReactEcharts from 'echarts-for-react'
import { getTreeMapEChartsConfig } from '../../common'

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
  const theme = useTheme()
  const onClick = (e: any) => (e.name ? handleClick(search, e.name) : '')

  return (
    <div>
      <ReactEcharts
        style={{ height: chartHeight }}
        onEvents={{ click: onClick }}
        option={getTreeMapEChartsConfig(
          theme.palette.text.primary,
          title,
          data
        )}
      />
      <button hidden onClick={onClick} data-testid="tree-map-echarts"></button>
    </div>
  )
}
