import { EmailXferedDatum } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

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

  interface HighChartsDatum {
    name: string
    y: number
    color: string
    events: any
  }
  const custodians: Array<HighChartsDatum> = []
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

  const config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor: theme.palette.background.default,
    },
    title: {
      text: title,
      style: {
        color: theme.palette.text.primary,
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Custodians',
        colorByPoint: true,
        data: custodians,
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={config} />
}
