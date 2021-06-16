import HighchartsReactNative from '@highcharts/highcharts-react-native'
import {
  blackBackground,
  EmailXferedDatum,
  getBarHighchartsConfig,
  getDarkMode,
} from '@klonzo/common'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

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
  const darkMode = useSelector(getDarkMode)

  return (
    <HighchartsReactNative
      styles={styles.container}
      options={getBarHighchartsConfig(
        darkMode ? 'white' : 'black',
        title,
        search,
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
