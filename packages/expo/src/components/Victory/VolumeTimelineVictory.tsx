import { RootState, TotalEmailSentDatum } from '@klonzo/shared'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory-native'

// https://formidable.com/open-source/victory/docs/victory-polar-axis

interface Props {
  title: string
  data: Array<TotalEmailSentDatum>
  handleClick: (date: string) => void
}

export default function VolumeTimelineVictory({ data }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const [orientation, setOrientation] = useState('portrait')
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
    <View
      style={styles.container}
      onLayout={({ nativeEvent }: any) =>
        setOrientation(
          nativeEvent.layout.width < nativeEvent.layout.height
            ? 'portrait'
            : 'landscape'
        )
      }
    >
      <VictoryChart
        scale={{ x: 'time' }}
        padding={
          orientation === 'portrait'
            ? { left: 30, top: 70, right: 20, bottom: 10 }
            : { left: 20, top: 40, right: 0, bottom: 10 }
        }
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
                      mutation: () => {
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
