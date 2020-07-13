import React from 'react'
import AppHeader from '../components/AppHeader'
import ChordECharts from '../components/ECharts/ChordECharts'
import { useSelector } from 'react-redux'
import { RootState } from './../store/types'

export default function ChordView() {
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)

  console.log(contacts)

  return (
    <>
      <AppHeader title="Chord" />
      <ChordECharts />
    </>
  )
}
