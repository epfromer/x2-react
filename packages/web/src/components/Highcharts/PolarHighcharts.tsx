import { EmailXferedDatum, RootState } from '@klonzo/common'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartPolar from 'highcharts/highcharts-more'
import React from 'react'
import { useSelector } from 'react-redux'

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
  const darkMode = useSelector((state: RootState) => state.darkMode)

  interface Datum {
    name: string
    value: number
    color: string
  }

  const series: Array<any> = data.map((datum) => ({
    type: 'column',
    name: datum.name,
    data: [datum.value],
    color: datum.color,
    pointPlacement: 'between',
    events: {
      click: () => handleClick(search, datum.name),
    },
  }))

  const config = {
    chart: {
      polar: true,
      height: '100%',
      backgroundColor: darkMode ? '#303030' : '#FAFAFA',
    },
    title: {
      text: title,
      style: {
        color: darkMode ? 'white' : 'black',
      },
    },
    xAxis: {
      labels: {
        format: '{value}',
      },
    },
    legend: {
      itemStyle: {
        color: darkMode ? 'white' : 'black',
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
    series,
  }

  return <HighchartsReact highcharts={Highcharts} options={config} />
}
