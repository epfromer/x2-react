import {
  clearSearch,
  getEmailAsync,
  selectContactsLoading,
  selectEmailSentByContact,
  setFrom,
  setTo,
} from '@klonzo/common'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'

interface Props {
  route: any
  navigation: any
}
export default function NetworkGraphView({ navigation }: Props) {
  const dispatch = useDispatch()
  const emailSentByContact = useSelector(selectEmailSentByContact)
  const contactsLoading = useSelector(selectContactsLoading)

  function handleClick(to: string, from: string) {
    if (!from || !to) return
    dispatch(clearSearch())
    dispatch(setFrom(`(${from})`))
    dispatch(setTo(`(${to})`))
    getEmailAsync()
    navigation.navigate('SearchView')
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Spinner visible={contactsLoading} textContent={'Loading...'} />
        {!contactsLoading && (
          <NetworkGraphECharts
            title="Email Senders to Receivers"
            data={emailSentByContact.data}
            nodes={emailSentByContact.nodes}
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
