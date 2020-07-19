import { Spinner } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import VolumeTimelineECharts from '../components/ECharts/VolumeTimelineECharts'
import { RootState, TotalEmailSentDatum } from '../store/types'
import { fetchAndCache } from './../store'

export default function VolumeTimelineView() {
  const dispatch = useDispatch()
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
        {emailSentLoading && <Spinner color={themePrimaryColor} />}
        {emailSent && (
          <VolumeTimelineECharts
            title="Senders / Receivers"
            data={data}
            handleClick={handleClick}
          />
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
