import {
  clearSearch,
  getEmailAsync,
  selectContacts,
  selectContactsLoading,
  selectDarkMode,
  selectEmailReceivers,
  selectEmailSenders,
  setFrom,
  setTo,
} from '@klonzo/common'
import { Picker } from '@react-native-community/picker'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import BarECharts from '../components/ECharts/BarECharts'
import BarHighcharts from '../components/Highcharts/BarHighcharts'
import BarVictory from '../components/Victory/BarVictory'

interface Props {
  route: any
  navigation: any
  isSendersDef?: boolean
  chartLibDef?: string
}
export default function BarView({
  navigation,
  isSendersDef = true,
  chartLibDef = 'ECharts',
}: Props) {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [isSenders, setIsSenders] = useState(isSendersDef)
  const [chartLib, setChartLib] = useState(chartLibDef)
  const contactsLoading = useSelector(selectContactsLoading)
  const contacts = useSelector(selectContacts)
  const emailSenders = useSelector(selectEmailSenders)
  const emailReceivers = useSelector(selectEmailReceivers)

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

  function handleClick(key: string, value: string) {
    dispatch(clearSearch())
    if (key === 'from') {
      dispatch(setFrom(`(${value})`))
    } else {
      dispatch(setTo(`(${value})`))
    }
    getEmailAsync()
    navigation.navigate('SearchView')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={contactsLoading} textContent={'Loading...'} />
      {contacts && (
        <>
          {chartLib === 'ECharts' && (
            <>
              {isSenders && (
                <BarECharts
                  title="Senders"
                  search="from"
                  data={emailSenders}
                  handleClick={handleClick}
                />
              )}
              {!isSenders && (
                <BarECharts
                  title="Receivers"
                  search="to"
                  data={emailReceivers}
                  handleClick={handleClick}
                />
              )}
            </>
          )}
          {chartLib === 'Victory' && (
            <>
              {isSenders && (
                <BarVictory
                  title="Senders"
                  search="from"
                  data={emailSenders}
                  handleClick={handleClick}
                />
              )}
              {!isSenders && (
                <BarVictory
                  title="Receivers"
                  search="to"
                  data={emailReceivers}
                  handleClick={handleClick}
                />
              )}
            </>
          )}
          {chartLib === 'Highcharts' && (
            <>
              {isSenders && (
                <BarHighcharts
                  title="Senders"
                  search="from"
                  data={emailSenders}
                  handleClick={handleClick}
                />
              )}
              {!isSenders && (
                <BarHighcharts
                  title="Receivers"
                  search="to"
                  data={emailReceivers}
                  handleClick={handleClick}
                />
              )}
            </>
          )}
        </>
      )}
      <Picker
        selectedValue={isSenders ? 'Senders' : 'Receivers'}
        onValueChange={(value) => setIsSenders(value === 'Senders')}
        style={styles.picker}
        itemStyle={styles.itemStyle}
        testID="xmittype"
      >
        <Picker.Item label="Senders" value="Senders" />
        <Picker.Item label="Receivers" value="Receivers" />
      </Picker>
      <Picker
        selectedValue={chartLib}
        onValueChange={(value) => setChartLib(value as string)}
        style={styles.picker}
        itemStyle={styles.itemStyle}
      >
        <Picker.Item label="ECharts" value="ECharts" />
        <Picker.Item label="Highcharts" value="Highcharts" />
        <Picker.Item label="Victory" value="Victory" />
      </Picker>
    </SafeAreaView>
  )
}
