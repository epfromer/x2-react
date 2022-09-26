import { useTheme } from '@mui/material/styles'
import ReactEcharts from 'echarts-for-react'
import { EmailSentByDay, getVolumeTimelineEChartsConfig } from '../../common'

// https://echarts.apache.org/examples/en/index.html#chart-type-bar

const chartHeight = '500px'
const chartWidth = '100%'

interface Props {
  title: string
  data: Array<EmailSentByDay>
  handleClick: (date: string) => void
}
export default function VolumeTimelineECharts({
  title,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()
  const onClick = (e: any) => handleClick(e.name)

  return (
    <div>
      <ReactEcharts
        style={{ height: chartHeight, width: chartWidth }}
        onEvents={{ click: onClick }}
        option={getVolumeTimelineEChartsConfig(
          theme.palette.text.primary,
          title,
          data
        )}
      />
      <button
        hidden
        onClick={onClick}
        data-testid="volume-timeline-echarts"
      ></button>
    </div>
  )
}
