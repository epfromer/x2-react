import { selectDarkMode, TotalEmailSentDatum } from '@klonzo/common'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
  data: Array<TotalEmailSentDatum>
  handleClick: (date: string) => void
}

export default function VolumeTimelineVictory({
  title,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector(selectDarkMode)
  const [zoomDomain, setZoomDomain] = useState({
    x: [new Date(1999, 1, 1), new Date(2002, 3, 1)],
  })

  function handleZoom(domain: any) {
    setZoomDomain(domain)
  }

  interface Datum {
    sent: number
    value: number
  }
  const chartData: Array<Datum> = data.map((datum) => ({
    sent: new Date(datum.sent).getTime(),
    value: datum.value,
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
              fill: darkMode ? 'white' : 'black',
              fontSize: 8,
              padding: 1,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fill: darkMode ? 'white' : 'black',
              fontSize: 8,
              padding: 1,
            },
          }}
        />
        <VictoryLine
          style={{
            labels: {
              fontSize: 15,
              fill: darkMode ? 'white' : 'black',
            },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          data={chartData}
          x="sent"
          y="value"
          events={[
            {
              target: 'data',
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props: any) => {
                        // TODO - no datum prop - bug
                        // handleClick(search, props.datum.xName)
                        return null
                      },
                    },
                  ]
                },
              },
            },
          ]}
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
              fill: darkMode ? 'white' : 'black',
              fontSize: 10,
              padding: 1,
            },
          }}
        />
        <VictoryLine
          style={{
            labels: {
              fontSize: 15,
              fill: darkMode ? 'white' : 'black',
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
    </div>
  )
}
