import HighchartsReactNative from '@highcharts/highcharts-react-native'
import {
  blackBackground,
  EmailXferedDatum,
  getDarkMode,
  getPieHighchartsConfig,
} from '@klonzo/common'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext } from 'react-native-elements'
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
  const { theme }: any = useContext(ThemeContext)
  const darkMode = useSelector(getDarkMode)

  return (
    <HighchartsReactNative
      styles={styles.container}
      options={getPieHighchartsConfig(
        theme.colors.black,
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
