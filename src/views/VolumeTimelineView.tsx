import { Form, Picker, Spinner } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import VolumeTimelineECharts from '../components/ECharts/VolumeTimelineECharts'
import VolumeTimelineVictory from '../components/Victory/VolumeTimelineVictory'
import { RootState, TotalEmailSentDatum } from '../store/types'
import { fetchAndCache } from './../store'

export default function VolumeTimelineView() {
  const dispatch = useDispatch()
  const [chartLib, setChartLib] = useState('ECharts')
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const emailSentLoading = useSelector(
    (state: RootState) => state.emailSentLoading
  )
  const emailSent = useSelector((state: RootState) => state.emailSent)

  function handleClick(date: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({
      type: 'setReduxState',
      key: 'sent',
      value: date,
    })
    fetchAndCache('emails')
    // history.push('/SearchView')
  }

  let data: Array<TotalEmailSentDatum> = []
  if (emailSent) {
    data = emailSent.map((stat: any) => ({
      sent: stat.sent,
      value: stat.ids.length,
    }))
  }

  return (
    <>
      <AppHeader title="Volume Timeline" />
      <SafeAreaView style={styles.container}>
        {emailSentLoading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
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
        <Form>
          <Picker
            note
            mode="dropdown"
            selectedValue={chartLib}
            onValueChange={(value) => setChartLib(value)}
          >
            <Picker.Item label="ECharts" value="ECharts" />
            <Picker.Item label="Victory" value="Victory" />
          </Picker>
        </Form>
      </SafeAreaView>
    </>
  )
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
})
