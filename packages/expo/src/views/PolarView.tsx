import { Picker } from '@react-native-community/picker'
import {
  clearSearch,
  fetchAndCache,
  getEmailReceivers,
  getEmailSenders,
  RootState,
  setReduxState,
} from '@klonzo/shared'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import PolarECharts from '../components/ECharts/PolarECharts'
import PolarVictory from '../components/Victory/PolarVictory'

interface Props {
  route: any
  navigation: any
}
export default function PolarView({ navigation }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Spinner visible={contactsLoading} textContent={'Loading...'} />
        {contacts && (
          <>
            {chartLib === 'ECharts' && (
              <>
                {isSenders && (
                  <PolarECharts
                    title="Senders"
                    search="from"
                    data={emailSenders}
                    handleClick={handleClick}
                  />
                )}
                {!isSenders && (
                  <PolarECharts
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
                  <PolarVictory
                    title="Senders"
                    search="from"
                    data={emailSenders}
                    handleClick={handleClick}
                  />
                )}
                {!isSenders && (
                  <PolarVictory
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
        >
          <Picker.Item label="Senders" value="Senders" />
          <Picker.Item label="Receivers" value="Receivers" />
        </Picker>
        <Picker
          selectedValue={chartLib}
          onValueChange={(value: string) => setChartLib(value)}
          style={styles.picker}
          itemStyle={styles.itemStyle}
        >
          <Picker.Item label="ECharts" value="ECharts" />
          <Picker.Item label="Victory" value="Victory" />
        </Picker>
      </SafeAreaView>
    </>
  )
}
