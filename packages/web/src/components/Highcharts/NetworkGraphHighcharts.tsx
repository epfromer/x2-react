import { getDarkMode } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartNetworkGraph from 'highcharts/modules/networkgraph'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

HighchartNetworkGraph(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

// https://www.highcharts.com/docs/chart-and-series-types/network-graph

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (from: string, to: string) => void
}
export default function NetworkGraphHighcharts({
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
        networkgraph: {
          keys: ['from', 'to', 'weight'],
        },
        series: {
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            linkFormat: '{point.fromNode.name} \u2192 {point.toNode.name}',
          },
          events: {
            click: (e: any) => handleClick(e.point.id, ''),
          },
          marker: {
            radius: 20,
          },
        },
      },
      series: [
        {
          type: 'networkgraph',
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
