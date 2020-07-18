import { Form, Picker, Spinner } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import BarECharts from '../components/ECharts/BarECharts'
import { Contact, RootState } from '../store/types'
import { fetchAndCache, getEmailReceivers, getEmailSenders } from './../store'

export default function BarView() {
  const dispatch = useDispatch()
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

  function handleClick(key: string, value: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({ type: 'setReduxState', key, value: `(${value})` })
    fetchAndCache('emails')
    // history.push('/SearchView')
  }

  function handleSendersReceivers(value: string) {
    setIsSenders(value === 'Senders')
  }

  function getSenderTotals() {
    const data: Array<number> = []
    if (contacts) {
      contacts.forEach((contact: Contact) => {
        data.push(contact.senderTotal ? contact.senderTotal : 0)
      })
    }
    return data
  }

  function getReceiverTotals() {
    const data: Array<number> = []
    if (contacts) {
      contacts.forEach((contact: Contact) => {
        data.push(contact.receiverTotal ? contact.receiverTotal : 0)
      })
    }
    return data
  }

  function getContactNames() {
    const data: Array<string> = []
    if (contacts) {
      contacts.forEach((contact: Contact) => {
        data.push(contact.name)
      })
    }
    return data
  }

  return (
    <>
      <AppHeader title="Bar" />
      <SafeAreaView style={styles.container}>
        {contactsLoading && <Spinner color={themePrimaryColor} />}
        {contacts && isSenders && (
          <BarECharts
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
        )}
        {contacts && !isSenders && (
          <BarECharts
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
})
