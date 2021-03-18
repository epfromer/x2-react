import {
  blackBackground,
  clearSearch,
  getCustodians,
  getCustodiansLoading,
  getDarkMode,
  getEmailAsync,
  getEmailSentByCustodian,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import ChartPicker from '../components/ChartPicker'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'

export default function NetworkGraphView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [chartLib, setChartLib] = useState('ECharts')
  const emailSentByCustodian = useSelector(getEmailSentByCustodian)
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    chart: {
      flex: 9,
    },
    selectRow: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: darkMode ? blackBackground : 'white',
      justifyContent: 'space-evenly',
    },
  })

  function handleClick(from: string, to: string) {
    dispatch(clearSearch())
    if (from) {
      dispatch(setFrom(from.slice(0, from.search(/,/))))
    }
    if (to) {
      dispatch(setTo(to.slice(0, to.search(/,/))))
    }
    getEmailAsync(store)
    history.push('/SearchView')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={custodiansLoading}
        color={darkMode ? 'white' : 'black'}
        textContent={'Loading...'}
      />
      <View style={styles.chart}>
        {custodians && (
          <>
            {chartLib === 'ECharts' && (
              <NetworkGraphECharts
                title="Custodian Interaction"
                data={emailSentByCustodian.data}
                nodes={emailSentByCustodian.nodes}
                handleClick={handleClick}
              />
            )}
          </>
        )}
      </View>
      <View style={styles.selectRow}>
        <ChartPicker
          onChange={(value) => setChartLib(value)}
          chartNames={['ECharts']}
        />
      </View>
      {process.env.NODE_ENV === 'test' && (
        <Button onPress={() => handleClick('to', 'from')} testID="test-click" />
      )}
    </SafeAreaView>
  )
}
