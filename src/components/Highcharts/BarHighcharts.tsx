import HighchartsReactNative from '@highcharts/highcharts-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

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

export default function BarHighcharts() {
  return (
    <View>
      <HighchartsReactNative
        useCDN={true}
        styles={styles.container}
        options={config}
        useSSL={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
