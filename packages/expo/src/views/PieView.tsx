import {
  clearSearch,
  getEmailAsync,
  getCustodians,
  getCustodiansLoading,
  getEmailReceivers,
  getEmailSenders,
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
import PieECharts from '../components/ECharts/PieECharts'
import PieHighcharts from '../components/Highcharts/PieHighcharts'
import PieVictory from '../components/Victory/PieVictory'
import XmitTypePicker from '../components/XmitTypePicker'

export default function PieView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)
  const emailSenders = useSelector(getEmailSenders)
  const emailReceivers = useSelector(getEmailReceivers)
  const { theme }: any = useContext(ThemeContext)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
  })

  // TODO onClick (search for handle)
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
      {custodians && (
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
      <XmitTypePicker onChange={(value) => setIsSenders(value === 'Senders')} />
      <ChartPicker onChange={(value) => setChartLib(value)} />
      {process.env.NODE_ENV === 'test' && (
        <Button onPress={() => handleClick('to', 'from')} testID="test-click" />
      )}
    </SafeAreaView>
  )
}
