import {
  clearSearch,
  EmailSentByDay,
  getEmailAsync,
  selectEmailSentByDay,
  selectEmailSentByDayLoading,
  setSent,
} from '@klonzo/common'
import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ThemeContext } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import ChartPicker from '../components/ChartPicker'
import VolumeTimelineECharts from '../components/ECharts/VolumeTimelineECharts'
import VolumeTimelineHighcharts from '../components/Highcharts/VolumeTimelineHighcharts'
import VolumeTimelineVictory from '../components/Victory/VolumeTimelineVictory'

export default function VolumeTimelineView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)
  const [chartLib, setChartLib] = useState('ECharts')
  const emailSentLoading = useSelector(selectEmailSentByDayLoading)
  const emailSent = useSelector(selectEmailSentByDay)

  function handleClick(date: string) {
    dispatch(clearSearch())
    dispatch(setSent(date))
    getEmailAsync()
    history.push('/SearchView')
  }

  let data: Array<EmailSentByDay> = []
  if (emailSent) {
    data = emailSent.map((stat: any) => ({
      sent: stat.sent,
      total: stat.total,
    }))
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={emailSentLoading} textContent={'Loading...'} />
      {emailSent && (
        <>
          {chartLib === 'ECharts' && (
            <VolumeTimelineECharts
              title="Senders / Receivers"
              data={data}
              handleClick={handleClick}
            />
          )}
          {chartLib === 'Victory' && (
            <VolumeTimelineVictory
              title="Senders / Receivers"
              data={data}
              handleClick={handleClick}
            />
          )}
          {chartLib === 'Highcharts' && (
            <VolumeTimelineHighcharts
              title="Senders / Receivers"
              data={data}
              handleClick={handleClick}
            />
          )}
        </>
      )}
      <ChartPicker onChange={(value) => setChartLib(value)} />
    </SafeAreaView>
  )
}
