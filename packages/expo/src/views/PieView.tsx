import {
  clearSearch,
  fetchAndCache,
  getEmailReceivers,
  getEmailSenders,
  RootState,
  setReduxState,
} from '@klonzo/common'
import { Picker } from '@react-native-community/picker'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import PieECharts from '../components/ECharts/PieECharts'
import PieHighcharts from '../components/Highcharts/PieHighcharts'
import PieVictory from '../components/Victory/PieVictory'

interface Props {
  route: any
  navigation: any
}
export default function PieView({ navigation }: Props) {
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
                  <PieECharts
                    title="Senders"
                    search="from"
                    data={emailSenders}
                    handleClick={handleClick}
                  />
                )}
                {!isSenders && (
                  <PieECharts
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
                  <PieVictory
                    title="Senders"
                    search="from"
                    data={emailSenders}
                    handleClick={handleClick}
                  />
                )}
                {!isSenders && (
                  <PieVictory
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
                  <PieHighcharts
                    title="Senders"
                    search="from"
                    data={emailSenders}
                    handleClick={handleClick}
                  />
                )}
                {!isSenders && (
                  <PieHighcharts
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
          <Picker.Item label="Highcharts" value="Highcharts" />
          <Picker.Item label="Victory" value="Victory" />
        </Picker>
      </SafeAreaView>
    </>
  )
}
