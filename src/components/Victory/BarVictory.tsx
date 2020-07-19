import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from 'victory-native'
import { EmailXferedDatum, RootState } from '../../store/types'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}

export default function BarVictory({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)

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

  console.log('victory bar')

  return (
    <View style={styles.container}>
      <VictoryChart >
        <VictoryLabel
          text={title}
          x={225}
          y={30}
          textAnchor="middle"
          style={[{ fill: darkMode ? 'white' : 'black', fontSize: 10 }]}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fill: darkMode ? 'white' : 'black',
              fontSize: 15,
              padding: 1,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
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
          events={[
            {
              target: 'data',
              eventHandlers: {
                onClick: () => {
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
          data={data.reverse()}
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
    backgroundColor: '#f5fcff',
  },
})
