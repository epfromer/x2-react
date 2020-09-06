import HighchartsReactNative from '@highcharts/highcharts-react-native'
import {
  getVolumeTimeHighchartsConfig,
  selectDarkMode,
  EmailSentByDayDatum,
} from '@klonzo/common'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://www.highcharts.com/demo/line-time-series

interface Props {
  title: string
  data: Array<EmailSentByDayDatum>
  handleClick: (date: string) => void
}
export default function VolumeTimelineHighcharts({
  title,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector(selectDarkMode)
  return (
    <HighchartsReactNative
      styles={styles.container}
      options={getVolumeTimeHighchartsConfig(
        darkMode,
        title,
        data,
        darkMode ? 'black' : 'white',
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
