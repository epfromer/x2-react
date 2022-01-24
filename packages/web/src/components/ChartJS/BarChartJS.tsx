import { EmailXferedDatum, getDarkMode } from '@klonzo/common'
import { useTheme } from '@mui/material/styles'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const chartHeight = '220'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip
)

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
  const [getChartInstance, setChartInstance] = useState<any>(null)
  const darkMode = useSelector(getDarkMode)
  const theme = useTheme()

  const config: any = {
    type: 'bar',
    options: {
      indexAxis: 'y',
      plugins: {
        title: {
          display: true,
          padding: { bottom: 10 },
          color: theme.palette.text.primary,
          font: { size: 18 },
          text: title,
        },
        legend: {
          display: false,
        },
      },
      onClick: (e: any, item: any) => {
        if (item && item.length > 0) {
          handleClick(search, data[item[0].index].name)
        }
      },
      scales: {
        x: {
          ticks: {
            color: theme.palette.text.primary,
          },
        },
        y: {
          ticks: {
            color: theme.palette.text.primary,
          },
        },
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
      if (getChartInstance) getChartInstance.destroy()
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
