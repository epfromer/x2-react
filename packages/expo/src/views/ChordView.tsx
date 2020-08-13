import { getEmailSentStats, RootState } from '@klonzo/common'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import ChordHighcharts from '../components/Highcharts/ChordHighcharts'

export default function ChordView() {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const emailSentStats = useSelector((state: RootState) =>
    getEmailSentStats(state)
  )
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )

  function handleClick(from: string, to: string) {
    console.log(from, to)
    // if (!from || !to) return
    // clearSearch()
    // setReduxState('from', `(${from})`)
    // setReduxState('to', `(${to})`)
    // fetchAndCache('emails')
    // history.push('/SearchView')
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
    <SafeAreaView style={styles.container}>
      <Spinner visible={contactsLoading} textContent={'Loading...'} />
      {!contactsLoading && (
        <ChordHighcharts
          title="Email Senders to Receivers"
          data={emailSentStats.data}
          nodes={emailSentStats.nodes}
          handleClick={handleClick}
        />
      )}
    </SafeAreaView>
  )
}
