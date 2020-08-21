import {
  clearSearch,
  getEmailAsync,
  selectContacts,
  selectContactsLoading,
  selectDarkMode,
  selectEmailSentByContact,
  setFrom,
  setTo,
} from '@klonzo/common'
import { Picker } from '@react-native-community/picker'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'

interface Props {
  route: any
  navigation: any
  chartLibDef?: string
}
export default function NetworkGraphView({
  navigation,
  chartLibDef = 'ECharts',
}: Props) {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [chartLib, setChartLib] = useState(chartLibDef)
  const emailSentByContact = useSelector(selectEmailSentByContact)
  const contactsLoading = useSelector(selectContactsLoading)
  const contacts = useSelector(selectContacts)

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
    itemStyle: {
      color: darkMode ? 'white' : 'black',
    },
  })

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
        {contacts && (
          <>
            {chartLib === 'ECharts' && (
              <NetworkGraphECharts
                title="Email Senders to Receivers"
                data={emailSentByContact.data}
                nodes={emailSentByContact.nodes}
                handleClick={handleClick}
              />
            )}
          </>
        )}
        <Picker
          selectedValue={chartLib}
          onValueChange={(value) => setChartLib(value as string)}
          style={styles.picker}
          itemStyle={styles.itemStyle}
          testID="xmittype"
        >
          <Picker.Item label="ECharts" value="ECharts" />
        </Picker>
      </SafeAreaView>
    </>
  )
}
