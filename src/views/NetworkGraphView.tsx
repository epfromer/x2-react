import { Spinner } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'
import { fetchAndCache, getEmailSentStats } from './../store'
import { RootState } from './../store/types'

export default function NetworkGraphView() {
  const dispatch = useDispatch()
  const emailSentStats = useSelector((state: RootState) =>
    getEmailSentStats(state)
  )
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  function handleClick(to: string, from: string) {
    if (to && from) {
      dispatch({ type: 'clearSearch' })
      dispatch({ type: 'setReduxState', key: 'to', value: `(${to})` })
      dispatch({ type: 'setReduxState', key: 'from', value: `(${from})` })
      fetchAndCache('emails')
      // history.push('/SearchView')
    }
  }

  return (
    <>
      <AppHeader title="Network Graph" />
      <SafeAreaView style={styles.container}>
        {contactsLoading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
        {!contactsLoading && (
          <NetworkGraphECharts
            title="Email Senders to Receivers"
            data={emailSentStats.data}
            nodes={emailSentStats.nodes}
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
