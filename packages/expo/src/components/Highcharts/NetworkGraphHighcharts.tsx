import { EmailXferedDatum } from '@klonzo/common'
import React from 'react'
import { Text } from 'react-native'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-pie

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function NetworkGraphHighcharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  return <Text>NetworkGraphHighcharts</Text>
}
