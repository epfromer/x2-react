import { EmailXferedDatum, getPieHighchartsConfig } from '@klonzo/common'
import { useTheme } from '@mui/material/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

// https://www.highcharts.com/demo/pie-basic

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieHighcharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()

  interface HighchartsDatum {
    name: string
    y: number
    color: string
    events: any
  }
  const custodians: Array<HighchartsDatum> = []
  data.forEach((datum) => {
    custodians.push({
      name: datum.name,
      y: datum.value,
      color: datum.color,
      events: {
        click: (e: any) => handleClick(search, datum.name),
      },
    })
  })

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getPieHighchartsConfig(
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
