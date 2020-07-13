import { Form, Picker } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import PieECharts from '../components/ECharts/PieECharts'
import { fetchAndCache } from './../store'
import { RootState } from './../store/types'

// https://docs.nativebase.io/Components.html#picker-def-headref

export default function PieView() {
  const dispatch = useDispatch()
  const [isSenders, setIsSenders] = useState(true)
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

  interface Contact {
    name: string
    total: number
    color: string
    handleClick: (field: string, name: string) => void
  }

  function getSenders() {
    const data: Array<Contact> = []
    if (contacts) {
      contacts.forEach((contact) => {
        if (contact.senderTotal) {
          data.push({
            name: contact.name,
            total: contact.senderTotal,
            color: contact.color,
            handleClick,
          })
        }
      })
    }
    return data
  }

  function getReceivers() {
    const data: Array<Contact> = []
    if (contacts) {
      contacts.forEach((contact) => {
        if (contact.receiverTotal) {
          data.push({
            name: contact.name,
            total: contact.receiverTotal,
            color: contact.color,
            handleClick,
          })
        }
      })
    }
    return data
  }

  return (
    <>
      <AppHeader title="Pie" />
      <SafeAreaView style={styles.container}>
        {isSenders && (
          <PieECharts title="Senders" search="from" data={getSenders()} />
        )}
        {!isSenders && (
          <PieECharts title="Receivers" search="to" data={getReceivers()} />
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
