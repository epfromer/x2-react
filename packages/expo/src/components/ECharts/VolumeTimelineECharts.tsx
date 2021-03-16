import {
  blackBackground,
  EmailSentByDay,
  getDarkMode,
  getVolumeTimelineEChartsConfig,
} from '@klonzo/common'
import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'

// https://www.npmjs.com/package/react-native-echarts-wrapper

interface Props {
  title: string
  data: Array<EmailSentByDay>
  handleClick: (date: string) => void
}
export default function VolumeTimelineECharts({ title, data }: Props) {
  const darkMode = useSelector(getDarkMode)

  return (
    <ECharts
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      backgroundColor={darkMode ? blackBackground : 'white'}
      option={getVolumeTimelineEChartsConfig(
        darkMode ? 'white' : 'black',
        title,
        data
      )}
    />
  )
}
