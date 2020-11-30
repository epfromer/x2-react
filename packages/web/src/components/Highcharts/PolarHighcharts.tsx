import { EmailXferedDatum } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartPolar from 'highcharts/highcharts-more'
import React from 'react'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

HighchartPolar(Highcharts)

// https://www.highcharts.com/demo/polar

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PolarHighcharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()

  const config = {
    chart: {
      polar: true,
      height: '100%',
      backgroundColor: theme.palette.background.default,
    },
    title: {
      text: title,
      style: {
        color: theme.palette.text.primary,
      },
    },
    xAxis: {
      labels: {
        format: '{value}',
      },
    },
    legend: {
      itemStyle: {
        color: theme.palette.text.primary,
      },
    },
    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 45,
      },
      column: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },
    series: data.map((datum) => ({
      type: 'column',
      name: datum.name,
      data: [datum.value],
      color: datum.color,
      pointPlacement: 'between',
      events: {
        click: () => handleClick(search, datum.name),
      },
    })),
  }

  return <HighchartsReact highcharts={Highcharts} options={config} />
}
