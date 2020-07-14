import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ECharts } from 'react-native-echarts-wrapper'

export default function ChordECharts() {
  const config = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1220],
        type: 'line',
      },
    ],
  }

  return (
    <View style={styles.container}>
      <ECharts option={config} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
  },
})
