import React from 'react'
import AppHeader from '../components/AppHeader'
import PieECharts from '../components/ECharts/PieECharts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './../store/types'
import { fetchAndCache } from './../store'

export default function PieView() {
  const dispatch = useDispatch()
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
      <PieECharts title="Senders" search="from" data={getSenders()} />
    </>
  )
}
