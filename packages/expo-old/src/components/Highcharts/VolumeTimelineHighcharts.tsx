import HighchartsReactNative from '@highcharts/highcharts-react-native'
import {
  blackBackground,
  EmailSentByDay,
  getDarkMode,
  getVolumeTimeHighchartsConfig,
} from '@klonzo/common'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://www.highcharts.com/demo/line-time-series

interface Props {
  title: string
  data: Array<EmailSentByDay>
  handleClick: (date: string) => void
}
export default function VolumeTimelineHighcharts({
  title,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector(getDarkMode)

  return (
    <HighchartsReactNative
      styles={styles.container}
      options={getVolumeTimeHighchartsConfig(
        darkMode ? 'white' : 'black',
        title,
        data,
        darkMode ? blackBackground : 'white',
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
