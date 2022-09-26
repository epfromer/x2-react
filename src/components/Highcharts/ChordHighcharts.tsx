import { useTheme } from '@mui/material/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsWheel from 'highcharts/modules/dependency-wheel'
import HighchartSankey from 'highcharts/modules/sankey'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../common'

HighchartSankey(Highcharts)
HighchartsWheel(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

// https://www.highcharts.com/docs/chart-and-series-types/dependency-wheel

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (from: string, to: string) => void
}
export default function ChordHighcharts({
  title,
  data,
  nodes,
  handleClick,
}: Props) {
  const [config, setConfig] = useState<any>(null)
  const darkMode = useSelector(getDarkMode)
  const theme = useTheme()

  function createChart() {
    setConfig({
      chart: {
        backgroundColor: theme.palette.background.default,
      },
      title: {
        text: title,
        style: {
          color: theme.palette.text.primary,
        },
      },
      plotOptions: {
        dependencywheel: {
          keys: ['from', 'to', 'weight'],
        },
        series: {
          cursor: 'pointer',
          events: {
            click: (e: any) => handleClick(e.point.from, e.point.to),
          },
        },
      },
      series: [
        {
          type: 'dependencywheel',
          data: data.map((datum) => [datum.source, datum.target, datum.value]),
          nodes,
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
