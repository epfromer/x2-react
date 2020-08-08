import { Chart } from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { EmailXferedDatum, RootState } from '@x2react/shared'

// https://www.chartjs.org/docs/latest/charts/bar.html

const chartHeight = '220'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}

const BarChartJS: React.FC<Props> = ({ title, search, data, handleClick }) => {
  const chartContainer: any = useRef(null)
  const [, setChartInstance] = useState<any>(null)
  const darkMode = useSelector((state: RootState) => state.darkMode)

  const reversedData = data.map((datum) => datum).reverse()

  const config: any = {
    type: 'horizontalBar',
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        fontColor: darkMode ? 'white' : 'black',
        fontSize: 16,
        padding: 10,
        text: title,
      },
      onClick: (e: any, item: any) => {
        if (item && item.length > 0) {
          handleClick(search, reversedData[item[0]._index].name)
        }
      },
      scales: {
        xAxes: [
          {
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
      labels: reversedData.map((datum) => datum.name),
      datasets: [
        {
          label: title,
          backgroundColor: reversedData.map((datum) => datum.color),
          data: reversedData.map((datum) => datum.value),
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

export default BarChartJS
