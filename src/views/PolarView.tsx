import { Spinner } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import PolarECharts from '../components/ECharts/PolarECharts'
import { fetchAndCache } from './../store'
import { RootState } from './../store/types'

export default function PolarView() {
  const dispatch = useDispatch()
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

  interface Datum {
    name: string
    value: number
    color: string
    handleClick: (search: string, name: string) => void
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
            handleClick: () => handleClick('from', contact.name),
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
        if (contact.senderTotal) {
          data.push({
            name: contact.name,
            value: contact.receiverTotal,
            color: contact.color,
            handleClick: () => handleClick('to', contact.name),
          })
        }
      })
    }
    return data
  }

  return (
    <>
      <AppHeader title="Polar" />
      <SafeAreaView style={styles.container}>
        {contactsLoading && <Spinner color={themePrimaryColor} />}
        {contacts && <PolarECharts title="Senders" data={getSenders()} />}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
