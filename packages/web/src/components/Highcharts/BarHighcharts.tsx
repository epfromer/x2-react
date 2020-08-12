import {
  EmailXferedDatum,
  RootState,
  getBarHighchartsConfig,
} from '@klonzo/common'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'
import { useSelector } from 'react-redux'

// https://www.highcharts.com/demo/bar-basic

const chartHeight = 300

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
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getBarHighchartsConfig(
        useSelector((state: RootState) => state.darkMode),
        title,
        search,
        data.map((datum) => datum).reverse(),
        useSelector((state: RootState) => state.darkMode)
          ? '#303030'
          : '#FAFAFA',
        handleClick
      )}
    />
  )
}
