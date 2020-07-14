import { Form, Picker, Spinner } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import TreeMapECharts from '../components/ECharts/TreeMapECharts'
import { RootState } from '../store/types'
import { fetchAndCache } from './../store'

export default function TreeMapView() {
  const dispatch = useDispatch()
  const [isSenders, setIsSenders] = useState(true)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)

  function handleClick(search: string, value: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({
      type: 'setReduxState',
      key: search,
      value: `(${value})`,
    })
    fetchAndCache('emails')
    // history.push('/SearchView')
  }

  function handleSendersReceivers(value: string) {
    setIsSenders(value === 'Senders')
  }

  interface Datum {
    name: string
    value: number
    color: string
  }

  function getSenders() {
    const data: Array<Datum> = []
    if (contacts) {
      contacts.forEach((contact) => {
        if (contact.senderTotal) {
          data.push({
            name: contact.name,
            value: contact.senderTotal,
            color: contact.color,
          })
        }
      })
    }
    return data
  }

  function getReceivers() {
    const data: Array<Datum> = []
    if (contacts) {
      contacts.forEach((contact) => {
        if (contact.receiverTotal) {
          data.push({
            name: contact.name,
            value: contact.receiverTotal,
            color: contact.color,
          })
        }
      })
    }
    return data
  }

  return (
    <>
      <AppHeader title="Tree Map" />
      <SafeAreaView style={styles.container}>
        {contactsLoading && <Spinner color={themePrimaryColor} />}
        {contacts && isSenders && (
          <TreeMapECharts
            data={getSenders()}
            search="from"
            title="Named Senders to Any Recipient"
            handleClick={handleClick}
          />
        )}
        {contacts && !isSenders && (
          <TreeMapECharts
            data={getReceivers()}
            search="to"
            title="Named Receivers from Any Sender"
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
