import React, { useContext, useState } from 'react'
import { ThemeContext } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { textColor } from '../utils/appThemes'
import { getPickerStyles } from '../utils/pickerStyles'

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
  const { theme }: any = useContext(ThemeContext)
  const pickerStyles = getPickerStyles(
    textColor(theme),
    theme.Button.buttonStyle.backgroundColor,
    theme.colors.gray
  )
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
