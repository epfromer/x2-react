import { selectDarkMode } from '@klonzo/common'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
require('highcharts/modules/treemap')(Highcharts)

// https://www.highcharts.com/demo/treemap-coloraxis

interface Props {
  title: string
  data: any
  search: string
  handleClick: (search: string, name: string) => void
}

export default function TreeMapHighcharts({
  data,
  search,
  title,
  handleClick,
}: Props) {
  const [config, setConfig] = useState({})
  const darkMode = useSelector(selectDarkMode)

  function createChart() {
    // https://www.highcharts.com/docs/chart-and-series-types/treemap

    setConfig({
      chart: {
        height: '70%',
        backgroundColor: darkMode ? '#303030' : '#FAFAFA',
      },
      title: {
        text: title,
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          events: {
            click: (e: any) => handleClick(search, e.point.name),
          },
        },
      },
      series: [
        {
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          // layoutAlgorithm: 'stripes',
          alternateStartingDirection: true,
          levels: [
            {
              level: 1,
              layoutAlgorithm: 'sliceAndDice',
              dataLabels: {
                enabled: true,
                align: 'left',
                verticalAlign: 'top',
                style: {
                  fontSize: '15px',
                  fontWeight: 'bold',
                },
              },
            },
          ],
          data,
        },
      ],
    })
  }

  useEffect(() => {
    createChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <HighchartsReact highcharts={Highcharts} options={config} />
}
