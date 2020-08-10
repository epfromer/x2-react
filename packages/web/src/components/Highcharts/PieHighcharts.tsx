import { EmailXferedDatum, RootState } from '@x2react/shared'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { useSelector } from 'react-redux'

// https://www.highcharts.com/demo/pie-basic

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}

const PieHighcharts: React.FC<Props> = ({
  title,
  search,
  data,
  handleClick,
}) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  interface HighChartsDatum {
    name: string
    y: number
    color: string
    events: any
  }

  const contacts: Array<HighChartsDatum> = []
  data.forEach((datum) => {
    contacts.push({
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
      backgroundColor: darkMode ? '#303030' : '#FAFAFA',
    },
    title: {
      text: title,
      style: {
        color: darkMode ? 'white' : 'black',
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
        name: 'Brands',
        colorByPoint: true,
        data: contacts,
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={config} />
}

export default PieHighcharts
