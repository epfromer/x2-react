import { EmailXferedDatum, selectDarkMode } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import { Chart } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

// https://www.chartjs.org/docs/latest/charts/bar.html

const chartHeight = '220'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}

export default function BarChartJS({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const chartContainer: any = useRef(null)
  const [, setChartInstance] = useState<any>(null)
  const darkMode = useSelector(selectDarkMode)
  const theme = useTheme()

  const config: any = {
    type: 'horizontalBar',
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        fontColor: theme.palette.text.primary,
        fontSize: 16,
        padding: 10,
        text: title,
      },
      onClick: (e: any, item: any) => {
        if (item && item.length > 0) {
          handleClick(search, data[item[0]._index].name)
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: theme.palette.text.primary,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              fontColor: theme.palette.text.primary,
            },
          },
        ],
      },
    },
    data: {
      labels: data.map((datum) => datum.name),
      datasets: [
        {
          label: title,
          backgroundColor: data.map((datum) => datum.color),
          data: data.map((datum) => datum.value),
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
