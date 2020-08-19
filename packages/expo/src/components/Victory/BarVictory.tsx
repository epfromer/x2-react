import { EmailXferedDatum, selectDarkMode } from '@klonzo/common'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native'

// https://formidable.com/open-source/victory/docs/victory-bar
// TODO - https://github.com/FormidableLabs/victory-native/issues/568, events don't work on Android

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}

export default function BarVictory({ search, data, handleClick }: Props) {
  const darkMode = useSelector(selectDarkMode)
  const [orientation, setOrientation] = useState('portrait')

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
        padding={
          orientation === 'portrait'
            ? { left: 125, right: 10, top: 30, bottom: 20 }
            : { left: 90, top: 60, right: 0, bottom: 50 }
        }
      >
        <VictoryAxis
          style={{
            tickLabels: {
              fill: darkMode ? 'white' : 'black',
              fontSize: 10,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fill: darkMode ? 'white' : 'black',
              fontSize: 10,
            },
          }}
        />
        <VictoryBar
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      mutation: (props: any) => {
                        handleClick(search, props.datum.xName)
                        return null
                      },
                    },
                  ]
                },
              },
            },
          ]}
          horizontal
          data={data.map((datum) => datum).reverse()}
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
