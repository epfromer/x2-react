import {
  clearSearch,
  getEmailAsync,
  selectCustodians,
  selectCustodiansLoading,
  selectDarkMode,
  selectEmailSentByCustodian,
  setFrom,
  setTo,
} from '@klonzo/common'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import RNPickerSelect from 'react-native-picker-select'
import { useDispatch, useSelector } from 'react-redux'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'

interface Props {
  route: any
  navigation: any
}
export default function NetworkGraphView({ navigation }: Props) {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [chartLib, setChartLib] = useState('ECharts')
  const emailSentByCustodian = useSelector(selectEmailSentByCustodian)
  const custodiansLoading = useSelector(selectCustodiansLoading)
  const custodians = useSelector(selectCustodians)

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

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: darkMode ? 'white' : 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: darkMode ? 'white' : 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  })

  function handleClick(to: string, from: string) {
    if (!from || !to) return
    dispatch(clearSearch())
    dispatch(setFrom(from.slice(0, from.search(/,/))))
    dispatch(setTo(to.slice(0, to.search(/,/))))
    getEmailAsync()
    navigation.navigate('SearchView')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={custodiansLoading} textContent={'Loading...'} />
      {custodians && (
        <>
          {chartLib === 'ECharts' && (
            <NetworkGraphECharts
              title="Email Senders to Receivers"
              data={emailSentByCustodian.data}
              nodes={emailSentByCustodian.nodes}
              handleClick={handleClick}
            />
          )}
        </>
      )}
      <RNPickerSelect
        value={chartLib}
        touchableWrapperProps={{ testID: 'chartlib-picker' }}
        style={pickerSelectStyles}
        onValueChange={(value) => setChartLib(value)}
        items={[{ label: 'ECharts', value: 'ECharts' }]}
      />
    </SafeAreaView>
  )
}
