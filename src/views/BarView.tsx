import { Spinner } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import BarECharts from '../components/ECharts/BarECharts'
import { Contact, RootState } from '../store/types'
import { fetchAndCache } from './../store'

export default function BarView() {
  const dispatch = useDispatch()
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)

  function handleClick(key: string, value: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({ type: 'setReduxState', key, value: `(${value})` })
    fetchAndCache('emails')
    // history.push('/SearchView')
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
        <BarECharts
          title="Senders / Receivers"
          contactNames={getContactNames()}
          senderTotals={getSenderTotals()}
          receiverTotals={getReceiverTotals()}
          handleClick={handleClick}
        />
        {/* <BarHighcharts /> */}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
