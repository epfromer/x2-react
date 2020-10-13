import { EmailXferedDatum, getBarHighchartsConfig } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

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
  const theme = useTheme()
  console.log(theme.palette.background.default)
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getBarHighchartsConfig(
        theme.palette.text.primary,
        title,
        search,
        data,
        theme.palette.background.default,
        handleClick
      )}
    />
  )
}
