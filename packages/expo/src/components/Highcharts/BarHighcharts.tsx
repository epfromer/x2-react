import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { EmailXferedDatum, getBarHighchartsConfig } from '@klonzo/common'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext } from 'react-native-elements'

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
  const { theme }: any = useContext(ThemeContext)
  return (
    <HighchartsReactNative
      styles={styles.container}
      options={getBarHighchartsConfig(
        theme.colors.black,
        title,
        search,
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
