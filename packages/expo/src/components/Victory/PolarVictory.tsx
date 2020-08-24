import { EmailXferedDatum, selectDarkMode } from '@klonzo/common'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import {
  VictoryBar,
  VictoryChart,
  VictoryPolarAxis,
  VictoryZoomContainer,
} from 'victory-native'

// https://formidable.com/open-source/victory/docs/victory-polar-axis

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}

export default function PolarVictory({ data }: Props) {
  const darkMode = useSelector(selectDarkMode)

  interface Datum {
    x: string
    y: number
    color: string
  }
  const vData: Array<Datum> = []
  data.forEach((datum) =>
    vData.push({
      x: datum.name,
      y: datum.value,
      color: datum.color,
    })
  )

  return (
    <View style={styles.container}>
      <VictoryChart polar containerComponent={<VictoryZoomContainer />}>
        <VictoryPolarAxis
          dependentAxis
          style={{
            tickLabels: {
              fill: darkMode ? 'white' : 'black',
              fontSize: 15,
              padding: 1,
            },
          }}
        />
        <VictoryPolarAxis
          labelPlacement="perpendicular"
          style={{
            tickLabels: {
              fill: darkMode ? 'white' : 'black',
              fontSize: 15,
              padding: 1,
            },
          }}
        />
        <VictoryBar
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          data={data}
          x="name"
          y="value"
          style={{
            data: {
              fill: ({ datum }) => datum.color,
            },
          }}
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
