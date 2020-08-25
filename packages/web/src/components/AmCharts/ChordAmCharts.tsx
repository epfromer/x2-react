import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import { selectDarkMode } from '@klonzo/common'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const chartHeight = '92vh'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '92vh',
  },
  chart: {
    width: '100%',
    height: '90%',
  },
}))

interface Props {
  title: string
  data: Array<any>
  nodes: Array<any>
  handleClick: (from: string, to: string) => void
}
export default function ChordAmCharts({
  title,
  data,
  nodes,
  handleClick,
}: Props) {
  const classes = useStyles()
  const [config, setConfig] = useState<any>(null)
  const darkMode = useSelector(selectDarkMode)

  function createChart() {
    const chart = am4core.create('ChordDiagram', am4charts.ChordDiagram)
    chart.data = data
    chart.dataFields.fromName = 'from'
    chart.dataFields.toName = 'to'
    chart.dataFields.value = 'weight'
    // chart.dataFields.color = 'nodeColor'
    // const links = chart.links.template
    // links.events.on('hit', (e) => handleSelect(e))
    if (darkMode) {
      const label = chart.nodes.template.label
      label.fill = am4core.color('white')
    }
    setConfig(config)
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
    if (config) config.dispose()
    setConfig(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode])

  useEffect(() => {
    createChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.root}>
      {config && <div id="ChordDiagram" className={classes.chart}></div>}
    </div>
  )
}
