import { EmailXferedDatum, RootState } from '@klonzo/shared'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { useSelector } from 'react-redux'

// https://www.highcharts.com/demo/bar-basic

const chartHeight = 300

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, value: string) => void
}

const BarHighcharts: React.FC<Props> = ({
  title,
  search,
  data,
  handleClick,
}) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  const reversedData = data.map((datum) => datum).reverse()

  const config = {
    chart: {
      type: 'bar',
      height: chartHeight,
      backgroundColor: darkMode ? '#303030' : '#FAFAFA',
    },
    title: {
      text: title,
      style: {
        color: darkMode ? 'white' : 'black',
      },
    },
    xAxis: {
      categories: reversedData.map((datum) => datum.name),
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      labels: {
        overflow: 'justify',
      },
      title: {
        text: null,
      },
    },
    tooltip: {
      valueSuffix: ' email',
    },
    plotOptions: {
      bar: {
        events: {
          click: (e: any) => handleClick(search, e.point.category),
        },
      },
    },
    series: [
      {
        showInLegend: false,
        colorByPoint: true,
        colors: reversedData.map((datum) => datum.color),
        data: reversedData.map((datum) => datum.value),
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={config} />
}

export default BarHighcharts
