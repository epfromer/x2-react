import { useTheme } from '@mui/material/styles'
import ReactEcharts from 'echarts-for-react'
import { EmailXferedDatum, getBarEChartsConfig } from '../../common'

// https://echarts.apache.org/examples/en/index.html#chart-type-bar

const chartHeight = '300px'
const chartWidth = '110%'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}
export default function BarECharts({
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
        option={getBarEChartsConfig(
          theme.palette.text.primary,
          title,
          data.map((datum) => datum).reverse(),
          {}
        )}
      />
      <button hidden onClick={onClick} data-testid="bar-echarts"></button>
    </div>
  )
}
