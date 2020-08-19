import HighchartsReactNative from '@highcharts/highcharts-react-native'
import {
  EmailXferedDatum,
  selectDarkMode,
  getPieHighchartsConfig,
} from '@klonzo/common'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-pie

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieHighcharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  return (
    <HighchartsReactNative
      styles={styles.container}
      options={getPieHighchartsConfig(
        useSelector(selectDarkMode),
        title,
        search,
        data,
        useSelector(selectDarkMode) ? 'black' : 'white',
        handleClick
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
