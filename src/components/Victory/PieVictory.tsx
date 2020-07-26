import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { VictoryPie } from 'victory-native'
import { EmailXferedDatum, RootState } from '../../store/types'

// https://formidable.com/open-source/victory/docs/victory-pie
// TODO - https://github.com/FormidableLabs/victory-native/issues/568, events don't work on Android

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}

export default function PieVictory({ search, data, handleClick }: Props) {
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
