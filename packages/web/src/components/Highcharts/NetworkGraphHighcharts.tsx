import { getDarkMode } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartNetworkGraph from 'highcharts/modules/networkgraph'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

HighchartNetworkGraph(Highcharts)

// https://www.highcharts.com/docs/chart-and-series-types/network-graph

const chartHeight = '50%'

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (name: string) => void
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
        height: chartHeight,
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
            click: (e: any) => handleClick(e.point.id),
          },
          marker: {
            radius: 20,
          },
        },
      },
      series: [
        {
          type: 'networkgraph',
          data,
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
