import { selectDarkMode } from '@klonzo/common'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { useSelector } from 'react-redux'
import getPickerStyles from '../common/pickerStyles'

interface Props {
  initialValue?: string
  onChange: (value: string) => void
  chartNames?: Array<string>
}
export default function ChartPicker({
  initialValue = 'ECharts',
  onChange,
  chartNames = ['ECharts', 'Highcharts', 'Victory'],
}: Props) {
  const darkMode = useSelector(selectDarkMode)
  const pickerStyles = getPickerStyles(darkMode)
  const [chartLib, setChartLib] = useState(initialValue)

  return (
    <RNPickerSelect
      value={chartLib}
      touchableWrapperProps={{ testID: 'chartlib-picker' }}
      style={pickerStyles}
      useNativeAndroidPickerStyle={false}
      placeholder={{}}
      onValueChange={(v) => {
        setChartLib(v)
        onChange(v)
      }}
      items={chartNames.map((name) => ({ label: name, value: name }))}
    />
  )
}
