import { EmailXferedDatum, selectDarkMode } from '@klonzo/common'
import { Chart } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'

// https://www.chartjs.org/docs/latest/charts/polar.html

const chartHeight = '200'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}

export default function PolarChartJS({
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
    type: 'polarArea',
    options: {
      title: {
        display: true,
        fontColor: theme.palette.text.primary,
        fontSize: 16,
        padding: 10,
        text: title,
      },
      legend: {
        position: 'bottom',
      },
      onClick: (e: any, item: any) => {
        if (item && item.length > 0) {
          handleClick(search, data[item[0]._index].name)
        }
      },
    },
    data: {
      labels: data.map((datum) => datum.name),
      datasets: [
        {
          data: data.map((datum) => datum.value),
          backgroundColor: data.map((datum) => datum.color),
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
