import { Form, Picker, Spinner } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import BarECharts from '../components/ECharts/BarECharts'
import BarVictory from '../components/Victory/BarVictory'
import { RootState } from '../store/types'
import { fetchAndCache, getEmailReceivers, getEmailSenders } from './../store'

export default function BarView() {
  const dispatch = useDispatch()
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const emailSenders = useSelector((state: RootState) => getEmailSenders(state))
  const emailReceivers = useSelector((state: RootState) =>
    getEmailReceivers(state)
  )

  function handleClick(key: string, value: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({ type: 'setReduxState', key, value: `(${value})` })
    fetchAndCache('emails')
    // history.push('/SearchView')
  }

  return (
    <>
      <AppHeader title="Bar" />
      <SafeAreaView style={styles.container}>
        {contactsLoading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
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
          </>
        )}
        <Form>
          <Picker
            note
            mode="dropdown"
            selectedValue={isSenders ? 'Senders' : 'Receivers'}
            onValueChange={(value) => setIsSenders(value === 'Senders')}
          >
            <Picker.Item label="Senders" value="Senders" />
            <Picker.Item label="Receivers" value="Receivers" />
          </Picker>
          <Picker
            note
            mode="dropdown"
            selectedValue={chartLib}
            onValueChange={(value) => setChartLib(value)}
          >
            <Picker.Item label="ECharts" value="ECharts" />
            <Picker.Item label="Victory" value="Victory" />
          </Picker>
        </Form>
      </SafeAreaView>
    </>
  )
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
})
