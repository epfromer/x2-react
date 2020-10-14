import { EmailXferedDatum, getPolarEChartsConfig } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import ReactEcharts from 'echarts-for-react'
import React from 'react'

// https://echarts.apache.org/examples/en/index.html#chart-type-pie

const chartHeight = '600px'
const chartWidth = '100%'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PolarECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()
  const onClick = (e: any) => handleClick(search, e.name)

  return (
    <div>
      <ReactEcharts
        style={{ height: chartHeight, width: chartWidth }}
        onEvents={{ click: onClick }}
        option={getPolarEChartsConfig(theme.palette.text.primary, title, data)}
      />
      <button hidden onClick={onClick} data-testid="polar-echarts"></button>
    </div>
  )
}
