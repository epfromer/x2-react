import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, TotalEmailSentDatum } from '../../store/types'

// https://www.highcharts.com/demo/line-time-series

const chartHeight = '400px'

interface Props {
  title: string
  data: Array<TotalEmailSentDatum>
  handleClick: (date: string) => void
}

const VolumeTimelineHighcharts: React.FC<Props> = ({
  title,
  data,
  handleClick,
}) => {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const dailyTotals: Array<[number, number]> = data.map((stat) => [
    new Date(stat.sent).getTime(),
    stat.value,
  ])

  const config = {
    chart: {
      zoomType: 'x',
      height: chartHeight,
      backgroundColor: darkMode ? '#303030' : '#FAFAFA',
    },
    title: {
      text: title,
      style: {
        color: darkMode ? 'white' : 'black',
      },
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? 'Click and drag in the plot area to zoom in'
          : 'Pinch the chart to zoom in',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: '# emails sent',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        events: {
          click: (e: any) =>
            handleClick(new Date(e.point.category).toISOString().slice(0, 10)),
        },
      },
    },
    series: [
      {
        type: 'area',
        name: '# emails sent',
        data: dailyTotals,
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={config} />
}

export default VolumeTimelineHighcharts
