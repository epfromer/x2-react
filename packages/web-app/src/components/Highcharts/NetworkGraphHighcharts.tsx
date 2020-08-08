import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartNetworkGraph from 'highcharts/modules/networkgraph'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

HighchartNetworkGraph(Highcharts)

// https://www.highcharts.com/docs/chart-and-series-types/network-graph

const chartHeight = '50%'

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (to: string, from: string) => void
}

const NetworkGraphHighcharts: React.FC<Props> = ({
  title,
  data,
  nodes,
  handleClick,
}) => {
  const [config, setConfig] = useState<any>(null)
  const darkMode = useSelector((state: RootState) => state.darkMode)

  function createChart() {
    setConfig({
      chart: {
        height: chartHeight,
        backgroundColor: darkMode ? '#303030' : '#FAFAFA',
      },
      title: {
        text: title,
        style: {
          color: darkMode ? 'white' : 'black',
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
            click: (e: any) => {
              // TODO - fix to have link click
              handleClick(e.point.from, e.point.to)
            },
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
    // TODO - this is done to delay the render as there's a bug
    // which will result in animation object undefined with multiple renders
    if (!config) {
      createChart()
    }
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
      {/* // TODO fix */}
      {/* <button hidden onClick={() => handleClick('Watkins, Sherron')}>
        handleClickNetworkGraph
      </button> */}
    </div>
  )
}

export default NetworkGraphHighcharts
