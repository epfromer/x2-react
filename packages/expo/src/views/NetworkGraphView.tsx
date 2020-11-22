import {
  clearSearch,
  getEmailAsync,
  getCustodians,
  getCustodiansLoading,
  getEmailSentByCustodian,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, ThemeContext } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import ChartPicker from '../components/ChartPicker'
import NetworkGraphECharts from '../components/ECharts/NetworkGraphECharts'

export default function NetworkGraphView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)
  const [chartLib, setChartLib] = useState('ECharts')
  const emailSentByCustodian = useSelector(getEmailSentByCustodian)
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
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
      <Spinner visible={custodiansLoading} textContent={'Loading...'} />
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
      <ChartPicker
        onChange={(value) => setChartLib(value)}
        chartNames={['ECharts']}
      />
      {process.env.NODE_ENV === 'test' && (
        <Button onPress={() => handleClick('to', 'from')} testID="test-click" />
      )}
    </SafeAreaView>
  )
}
