import {
  blackBackground,
  clearSearch,
  getCustodians,
  getCustodiansLoading,
  getDarkMode,
  getEmailAsync,
  getEmailReceivers,
  getEmailSenders,
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
import BarECharts from '../components/ECharts/BarECharts'
import BarHighcharts from '../components/Highcharts/BarHighcharts'
import BarVictory from '../components/Victory/BarVictory'
import XmitTypePicker from '../components/XmitTypePicker'

export default function BarView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)
  const emailSenders = useSelector(getEmailSenders)
  const emailReceivers = useSelector(getEmailReceivers)
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

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={custodiansLoading} textContent={'Loading...'} />
      <View style={styles.chart}>
        {custodians && (
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
      </View>
      <View style={styles.selectRow}>
        <XmitTypePicker
          onChange={(value) => setIsSenders(value === 'Senders')}
        />
        <ChartPicker onChange={(value) => setChartLib(value)} />
      </View>

      {process.env.NODE_ENV === 'test' && (
        <Button
          onPress={() => handleClick('from', 'foo')}
          testID="test-click"
        />
      )}
    </SafeAreaView>
  )
}
