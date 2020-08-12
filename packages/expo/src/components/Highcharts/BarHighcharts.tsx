import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { EmailXferedDatum } from '@klonzo/common'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

// TODO https://github.com/highcharts/highcharts-react-native/issues/86

const config = {
  series: [
    {
      data: [1, 2, 3],
    },
  ],
  chart: {
    type: 'line',
  },
}

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}
export default function BarHighcharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  return (
    <View style={styles.container}>
      <HighchartsReactNative styles={styles.container} options={config} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
