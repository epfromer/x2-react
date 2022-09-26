import { useTheme } from '@mui/material/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../common'

require('highcharts/modules/treemap')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

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
  const [config, setConfig] = useState<any>(null)
  const darkMode = useSelector(getDarkMode)
  const theme = useTheme()

  function createChart() {
    // https://www.highcharts.com/docs/chart-and-series-types/treemap

    setConfig({
      chart: {
        height: '70%',
        backgroundColor: theme.palette.background.default,
      },
      title: {
        text: title,
        style: {
          color: theme.palette.text.primary,
        },
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
    if (!config) createChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  useEffect(() => {
    setConfig(null)
  }, [darkMode])

  useEffect(() => {
    createChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {config && <HighchartsReact highcharts={Highcharts} options={config} />}
    </div>
  )
}
