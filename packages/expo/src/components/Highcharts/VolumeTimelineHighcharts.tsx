import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { EmailSentByDay, getVolumeTimeHighchartsConfig } from '@klonzo/common'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext } from 'react-native-elements'

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
  const { theme }: any = useContext(ThemeContext)
  return (
    <HighchartsReactNative
      styles={styles.container}
      options={getVolumeTimeHighchartsConfig(
        theme.colors.black,
        title,
        data,
        theme.colors.white,
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
