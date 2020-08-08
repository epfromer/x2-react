import * as Highcharts from 'highcharts'
import HighchartsReactNative from '@highcharts/highcharts-react-native'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { EmailXferedDatum } from '../../store/types'

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
export default function BarHighcharts() {
  return (
    <View>
      <HighchartsReactNative styles={styles.container} options={config} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
