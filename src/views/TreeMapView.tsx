import { Form, Picker, Spinner } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import TreeMapECharts from '../components/ECharts/TreeMapECharts'
import { RootState } from '../store/types'
import {
  clearSearch,
  fetchAndCache,
  getEmailReceivers,
  getEmailSenders,
  setReduxState,
} from './../store'

interface Props {
  navigation: any
}
export default function TreeMapView({ navigation }: Props) {
  const [isSenders, setIsSenders] = useState(true)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
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

  function handleSendersReceivers(value: string) {
    setIsSenders(value === 'Senders')
  }

  return (
    <>
      <AppHeader title="Tree Map" />
      <SafeAreaView style={styles.container}>
        {contactsLoading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
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
        <Form>
          <Picker
            note
            mode="dropdown"
            selectedValue={isSenders ? 'Senders' : 'Receivers'}
            onValueChange={handleSendersReceivers}
          >
            <Picker.Item label="Senders" value="Senders" />
            <Picker.Item label="Receivers" value="Receivers" />
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
