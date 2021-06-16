import React from 'react'
import Picker from './Picker'

interface Props {
  initialValue?: string
  onChange: (value: string) => void
  chartNames?: Array<string>
}
export default function ChartPicker({
  onChange,
  chartNames = ['ECharts', 'Highcharts', 'Victory'],
}: Props) {
  return <Picker selections={chartNames} onChange={onChange} />
}
