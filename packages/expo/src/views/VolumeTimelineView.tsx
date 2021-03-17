import {
  blackBackground,
  clearSearch,
  EmailSentByDay,
  getDarkMode,
  getEmailAsync,
  getEmailSentByDay,
  getEmailSentByDayLoading,
  setSent,
  store,
} from '@klonzo/common'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
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
  const [chartLib, setChartLib] = useState('ECharts')
  const emailSentLoading = useSelector(getEmailSentByDayLoading)
  const emailSent = useSelector(getEmailSentByDay)
  const darkMode = useSelector(getDarkMode)

  function handleClick(date: string) {
    dispatch(clearSearch())
    dispatch(setSent(date))
    getEmailAsync(store)
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
      flexDirection: 'column',
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    chart: {
      flex: 9,
    },
    selectRow: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: darkMode ? blackBackground : 'white',
      justifyContent: 'space-evenly',
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={emailSentLoading} textContent={'Loading...'} />
      <View style={styles.chart}>
        {emailSent && (
          <>
            {chartLib === 'ECharts' && (
              <VolumeTimelineECharts
                title="Email Volume per Day"
                data={data}
                handleClick={handleClick}
              />
            )}
            {chartLib === 'Victory' && (
              <VolumeTimelineVictory
                title="Email Volume per Day"
                data={data}
                handleClick={handleClick}
              />
            )}
            {chartLib === 'Highcharts' && (
              <VolumeTimelineHighcharts
                title="Email Volume per Day"
                data={data}
                handleClick={handleClick}
              />
            )}
          </>
        )}
      </View>
      <View style={styles.selectRow}>
        <ChartPicker onChange={(value) => setChartLib(value)} />
      </View>
      {process.env.NODE_ENV === 'test' && (
        <Button onPress={() => handleClick('2001-01-01')} testID="test-click" />
      )}
    </SafeAreaView>
  )
}
