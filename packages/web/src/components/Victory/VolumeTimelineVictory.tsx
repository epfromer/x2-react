import { EmailSentByDay } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import React, { useState } from 'react'
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory'

// https://formidable.com/open-source/victory/gallery/brush-and-zoom

const chartHeight = 200

interface Props {
  title: string
  data: Array<EmailSentByDay>
  handleClick: (date: string) => void
}
export default function VolumeTimelineVictory({
  title,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()
  const [zoomDomain, setZoomDomain] = useState({
    x: [new Date(1999, 1, 1), new Date(2002, 3, 1)],
  })

  const handleZoom = (domain: any) => setZoomDomain(domain)

  interface Datum {
    sent: number
    value: number
  }
  const chartData: Array<Datum> = data.map((datum) => ({
    sent: new Date(datum.sent).getTime(),
    value: datum.total,
  }))

  return (
    <div>
      <VictoryChart
        height={chartHeight}
        scale={{ x: 'time' }}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain as any}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryAxis
          style={{
            tickLabels: {
              fill: theme.palette.text.primary,
              fontSize: 8,
              padding: 1,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fill: theme.palette.text.primary,
              fontSize: 8,
              padding: 1,
            },
          }}
        />
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            labels: {
              fontSize: 15,
              fill: theme.palette.text.primary,
            },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          data={chartData}
          x="sent"
          y="value"
        />
      </VictoryChart>
      <VictoryChart
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        width={600}
        height={100}
        scale={{ x: 'time' }}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain as any}
            onBrushDomainChange={handleZoom}
          />
        }
      >
        <VictoryAxis
          tickFormat={(x) => new Date(x).getFullYear()}
          style={{
            tickLabels: {
              fill: theme.palette.text.primary,
              fontSize: 10,
              padding: 1,
            },
          }}
        />
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            labels: {
              fontSize: 15,
              fill: theme.palette.text.primary,
            },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          data={chartData}
          x="sent"
          y="value"
        />
      </VictoryChart>
      <button hidden data-testid="volume-timeline-victory"></button>
    </div>
  )
}
