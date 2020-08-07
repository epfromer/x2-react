import { Picker } from '@react-native-community/picker'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import VolumeTimelineECharts from '../components/ECharts/VolumeTimelineECharts'
import VolumeTimelineVictory from '../components/Victory/VolumeTimelineVictory'
import { RootState, TotalEmailSentDatum } from '../store/types'
import { clearSearch, fetchAndCache, setReduxState } from './../store/actions'

interface Props {
  route: any
  navigation: any
}
export default function VolumeTimelineView({ navigation }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const [chartLib, setChartLib] = useState('ECharts')
  const emailSentLoading = useSelector(
    (state: RootState) => state.emailSentLoading
  )
  const emailSent = useSelector((state: RootState) => state.emailSent)

  function handleClick(date: string) {
    clearSearch()
    setReduxState('sent', date)
    fetchAndCache('emails')
    navigation.navigate('SearchView')
  }

  let data: Array<TotalEmailSentDatum> = []
  if (emailSent) {
    data = emailSent.map((stat: any) => ({
      sent: stat.sent,
      value: stat.ids.length,
    }))
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    picker: {
      height: 150,
    },
    itemStyle: {
      color: darkMode ? 'white' : 'black',
    },
  })

  return (
    <>
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
          </>
        )}
        <Picker
          selectedValue={chartLib}
          onValueChange={(value: string) => setChartLib(value)}
          style={styles.picker}
          itemStyle={styles.itemStyle}
        >
          <Picker.Item label="ECharts" value="ECharts" />
          <Picker.Item label="Victory" value="Victory" />
        </Picker>
      </SafeAreaView>
    </>
  )
}

