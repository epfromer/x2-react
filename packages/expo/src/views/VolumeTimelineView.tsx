import {
  clearSearch,
  getEmailAsync,
  selectDarkMode,
  selectEmailSent,
  selectEmailSentLoading,
  setSent,
  TotalEmailSentDatum,
} from '@klonzo/common'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import VolumeTimelineECharts from '../components/ECharts/VolumeTimelineECharts'
import VolumeTimelineHighcharts from '../components/Highcharts/VolumeTimelineHighcharts'
import VolumeTimelineVictory from '../components/Victory/VolumeTimelineVictory'
import RNPickerSelect from 'react-native-picker-select'

interface Props {
  route: any
  navigation: any
}
export default function VolumeTimelineView({ navigation }: Props) {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [chartLib, setChartLib] = useState('ECharts')
  const emailSentLoading = useSelector(selectEmailSentLoading)
  const emailSent = useSelector(selectEmailSent)

  function handleClick(date: string) {
    dispatch(clearSearch())
    dispatch(setSent(date))
    getEmailAsync()
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
      color: useSelector(selectDarkMode) ? 'white' : 'black',
    },
  })

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: darkMode ? 'white' : 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: darkMode ? 'white' : 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
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
      <RNPickerSelect
        value={chartLib}
        touchableWrapperProps={{ testID: 'chartlib-picker' }}
        style={pickerSelectStyles}
        onValueChange={(value) => setChartLib(value)}
        items={[
          { label: 'ECharts', value: 'ECharts' },
          { label: 'Highcharts', value: 'Highcharts' },
          { label: 'Victory', value: 'Victory' },
        ]}
      />
    </SafeAreaView>
  )
}
