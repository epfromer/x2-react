import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsWheel from 'highcharts/modules/dependency-wheel'
import HighchartSankey from 'highcharts/modules/sankey'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

HighchartSankey(Highcharts)
HighchartsWheel(Highcharts)

// https://www.highcharts.com/docs/chart-and-series-types/dependency-wheel

const chartHeight = '95%'

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (from: string, to: string) => void
}

const ChordHighcharts: React.FC<Props> = ({
  title,
  data,
  nodes,
  handleClick,
}) => {
  const [config, setConfig] = useState<any>(null)
  const darkMode = useSelector((state: RootState) => state.darkMode)

  function createChart() {
    console.log('create chart')
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
        dependencywheel: {
          keys: ['from', 'to', 'weight'],
        },
        series: {
          cursor: 'pointer',
          events: {
            click: (e: any) => {
              console.log(e)
              handleClick(e.point.from, e.point.to)
            },
          },
        },
      },
      series: [
        {
          type: 'dependencywheel',
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
    </div>
  )
}

export default ChordHighcharts
