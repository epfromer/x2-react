import { selectDarkMode, EmailSentByDayDatum } from '@klonzo/common'
import { Chart } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

// https://www.chartjs.org/docs/latest/charts/bar.html
// https://www.createwithdata.com/react-chartjs-dashboard/

const chartHeight = '400'

interface Props {
  title: string
  data: Array<EmailSentByDayDatum>
  handleClick: (date: string) => void
}

export default function VolumeTimelineChartJS({
  title,
  data,
  handleClick,
}: Props) {
  const chartContainer: any = useRef(null)
  const [, setChartInstance] = useState<any>(null)
  const darkMode = useSelector(selectDarkMode)

  interface Datum {
    time: Date | string
    value: number
  }
  const dailyTotals: Array<Datum> = data.map((stat) => ({
    time: stat.sent,
    value: stat.value,
  }))

  const config: any = {
    type: 'bar',
    options: {
      maintainAspectRatio: false,
      onClick: (e: any, item: any) => {
        if (item && item.length > 0) {
          handleClick(
            new Date(dailyTotals[item[0]._index].time)
              .toISOString()
              .slice(0, 10)
          )
        }
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month',
            },
            ticks: {
              fontColor: darkMode ? 'white' : 'black',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              fontColor: darkMode ? 'white' : 'black',
            },
          },
        ],
      },
    },
    data: {
      labels: dailyTotals.map((d: Datum) => d.time),
      datasets: [
        {
          label: title,
          data: dailyTotals.map((d: Datum) => d.value),
          fill: 'none',
          backgroundColor: '#c43a31',
          pointRadius: 2,
          borderWidth: 1,
          lineTension: 0,
        },
      ],
    },
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, config)
      setChartInstance(newChartInstance)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer, darkMode])

  return (
    <div>
      <canvas height={chartHeight} ref={chartContainer} />
    </div>
  )
}
