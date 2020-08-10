// import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { EmailXferedDatum } from '@x2react/shared'
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
export default function BarHighcharts() {
  return (
    <View>
      {/* <HighchartsReactNative styles={styles.container} options={config} /> */}
      <Text>highcharts</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
