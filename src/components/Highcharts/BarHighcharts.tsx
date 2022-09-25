import { EmailXferedDatum, getBarHighchartsConfig } from '@klonzo/common'
import { useTheme } from '@mui/material/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

// https://www.highcharts.com/demo/bar-basic

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, value: string) => void
}
export default function BarHighcharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getBarHighchartsConfig(
        theme.palette.text.primary,
        title,
        search,
        data,
        theme.palette.background.default,
        handleClick
      )}
    />
  )
}
