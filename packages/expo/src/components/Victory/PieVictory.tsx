import { EmailXferedDatum, getDarkMode } from '@klonzo/common'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { VictoryPie } from 'victory-native'

// https://formidable.com/open-source/victory/docs/victory-pie
// TODO - https://github.com/FormidableLabs/victory-native/issues/568, events don't work on Android

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieVictory({ data }: Props) {
  const darkMode = useSelector(getDarkMode)

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
      <VictoryPie
        animate
        data={vData}
        style={{
          data: {
            fill: ({ datum }: any) => datum.color,
          },
          labels: {
            fill: darkMode ? 'white' : 'black',
            fontSize: 10,
          },
        }}
      />
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
