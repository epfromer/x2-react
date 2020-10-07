import {
  getVolumeTimelineEChartsConfig,
  selectDarkMode,
  EmailSentByDay,
} from '@klonzo/common'
import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// TODO fix click handler

interface Props {
  title: string
  data: Array<EmailSentByDay>
  handleClick: (date: string) => void
}
export default function VolumeTimelineECharts({ title, data }: Props) {
  return (
    <ECharts
      onData={(p) => console.log(p)}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      backgroundColor={useSelector(selectDarkMode) ? 'black' : 'white'}
      option={getVolumeTimelineEChartsConfig(
        useSelector(selectDarkMode),
        title,
        data
      )}
    />
  )
}
