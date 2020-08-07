import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'
import { clearSearch, fetchAndCache, setReduxState } from './../store/actions'
import { getEmailSentStats } from './../store/selectors'
import { RootState } from './../store/types'

interface Props {
  route: any
  navigation: any
}
export default function NetworkGraphView({ navigation }: Props) {
  const emailSentStats = useSelector((state: RootState) =>
    getEmailSentStats(state)
  )
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )

  function handleClick(to: string, from: string) {
    if (to && from) {
      clearSearch()
      setReduxState('to', `(${to})`)
      setReduxState('from', `(${from})`)
      fetchAndCache('emails')
      navigation.navigate('SearchView')
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Spinner visible={contactsLoading} textContent={'Loading...'} />
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
