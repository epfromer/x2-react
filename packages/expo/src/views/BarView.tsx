import {
  clearSearch,
  getEmailAsync,
  selectCustodians,
  selectEmailReceivers,
  selectEmailSenders,
  setFrom,
  setTo,
} from '@klonzo/common'
import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, ThemeContext } from 'react-native-elements'
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
  const custodians = useSelector(selectCustodians)
  const emailSenders = useSelector(selectEmailSenders)
  const emailReceivers = useSelector(selectEmailReceivers)
  const { theme }: any = useContext(ThemeContext)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
  })

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync()
    history.push('/SearchView')
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <XmitTypePicker onChange={(value) => setIsSenders(value === 'Senders')} />
      <ChartPicker onChange={(value) => setChartLib(value)} />
      {process.env.NODE_ENV === 'test' && (
        <Button
          onPress={() => handleClick('from', 'foo')}
          testID="test-click"
        />
      )}
    </SafeAreaView>
  )
}
