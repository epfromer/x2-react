import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-bar
// TODO fix y axis lable truncation
// TODO fix click handler

interface Props {
  title: string
  contactNames: Array<string>
  senderTotals: Array<number>
  receiverTotals: Array<number>
  handleClick: (key: string, value: string) => void
}

export default function BarECharts({
  title,
  contactNames,
  senderTotals,
  receiverTotals,
  handleClick,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const themeSecondaryColor = useSelector(
    (state: RootState) => state.themeSecondaryColor
  )

  function onData(name: string) {
    console.log(name)
    // data[0].handleClick(search, name)
  }

  return (
    <ECharts
      onData={onData}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      option={{
        title: {
          text: title,
          top: 20,
          left: 'center',
          textStyle: {
            color: darkMode ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          axisLabel: {
            color: darkMode ? 'white' : 'black',
          },
        },
        yAxis: {
          data: contactNames.reverse(),
          axisLabel: {
            color: darkMode ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'bar',
            color: themePrimaryColor,
            data: senderTotals.reverse(),
          },
          {
            type: 'bar',
            color: themeSecondaryColor,
            data: receiverTotals.reverse(),
          },
        ],
      }}
    />
  )
}
