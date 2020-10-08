import { EmailSentByDay, getVolumeTimelineEChartsConfig } from '@klonzo/common'
import React, { useContext } from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { ThemeContext } from 'react-native-elements'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// TODO fix click handler

interface Props {
  title: string
  data: Array<EmailSentByDay>
  handleClick: (date: string) => void
}
export default function VolumeTimelineECharts({ title, data }: Props) {
  const { theme }: any = useContext(ThemeContext)
  return (
    <ECharts
      onData={(p) => console.log(p)}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      backgroundColor={theme.colors.white}
      option={getVolumeTimelineEChartsConfig(theme.colors.black, title, data)}
    />
  )
}
