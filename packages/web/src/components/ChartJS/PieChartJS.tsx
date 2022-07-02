import { EmailXferedDatum, getDarkMode } from '@klonzo/common'
import { useTheme } from '@mui/material/styles'
import { Chart } from 'chart.js'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const chartHeight = '250'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieChartJS({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const chartContainer: any = useRef(null)
  const darkMode = useSelector(getDarkMode)
  const theme = useTheme()

  const config: any = {
    type: 'pie',
    options: {
      plugins: {
        title: {
          display: true,
          padding: { bottom: 10 },
          color: theme.palette.text.primary,
          font: { size: 18 },
          text: title,
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          color: theme.palette.text.primary,
        },
      },
    },
    onClick: (e: any, item: any) => {
      if (item && item.length > 0) {
        handleClick(search, data[item[0].index].name)
      }
    },
    data: {
      labels: data.map((datum) => datum.name),
      datasets: [
        {
          backgroundColor: data.map((datum) => datum.color),
          data: data.map((datum) => datum.value),
        },
      ],
    },
  }

  useEffect(() => {
    let instance: Chart
    if (chartContainer && chartContainer.current) {
      instance = new Chart(chartContainer.current, config)
    }
    return () => {
      if (instance) instance.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer, darkMode])

  return (
    <div>
      <canvas height={chartHeight} ref={chartContainer} />
    </div>
  )
}
