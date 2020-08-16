import {
  EmailXferedDatum,
  selectDarkMode,
  getBarHighchartsConfig,
} from '@klonzo/common'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { useSelector } from 'react-redux'

// https://www.highcharts.com/demo/bar-basic

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, value: string) => void
}
export default function BarHighcharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector(selectDarkMode)
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getBarHighchartsConfig(
        darkMode,
        title,
        search,
        data,
        darkMode ? '#303030' : '#FAFAFA',
        handleClick
      )}
    />
  )
}
