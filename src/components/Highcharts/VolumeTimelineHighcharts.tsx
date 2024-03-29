import { useTheme } from '@mui/material/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { EmailSentByDay, getVolumeTimeHighchartsConfig } from '../../common'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

// https://www.highcharts.com/demo/line-time-series

interface Props {
  title: string
  data: Array<EmailSentByDay>
  handleClick: (date: string) => void
}
export default function VolumeTimelineHighcharts({
  title,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getVolumeTimeHighchartsConfig(
        theme.palette.text.primary,
        title,
        data,
        theme.palette.background.default,
        handleClick
      )}
    />
  )
}
