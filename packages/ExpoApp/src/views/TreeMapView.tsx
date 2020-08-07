import { Picker } from '@react-native-community/picker'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import TreeMapECharts from '../components/ECharts/TreeMapECharts'
import { RootState } from '../store/types'
import { clearSearch, fetchAndCache, setReduxState } from './../store/actions'
import { getEmailReceivers, getEmailSenders } from './../store/selectors'

interface Props {
  navigation: any
}
export default function TreeMapView({ navigation }: Props) {
  const [isSenders, setIsSenders] = useState(true)
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const emailSenders = useSelector((state: RootState) => getEmailSenders(state))
  const emailReceivers = useSelector((state: RootState) =>
    getEmailReceivers(state)
  )

  function handleClick(search: string, value: string) {
    clearSearch()
    setReduxState(search, `(${value})`)
    fetchAndCache('emails')
    navigation.navigate('SearchView')
  }

  return (
    <>
      <AppHeader title="Tree Map" />
      <SafeAreaView style={styles.container}>
        <Spinner visible={contactsLoading} textContent={'Loading...'} />
        {contacts && isSenders && (
          <TreeMapECharts
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
        )}
        {contacts && !isSenders && (
          <TreeMapECharts
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
        )}
        <Picker
          selectedValue={isSenders ? 'Senders' : 'Receivers'}
          onValueChange={(value) => setIsSenders(value === 'Senders')}
          style={styles.picker}
        >
          <Picker.Item label="Senders" value="Senders" />
          <Picker.Item label="Receivers" value="Receivers" />
        </Picker>
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
  picker: {
    height: 150,
  },
})
