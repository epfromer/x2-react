import { Form, Picker, Spinner } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import PieECharts from '../components/ECharts/PieECharts'
import PieVictory from '../components/Victory/PieVictory'
import { fetchAndCache, getEmailReceivers, getEmailSenders } from './../store'
import { RootState } from './../store/types'

// https://docs.nativebase.io/Components.html#picker-def-headref

export default function PieView() {
  const dispatch = useDispatch()
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
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  function handleClick(search: string, value: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({
      type: 'setReduxState',
      key: search,
      value: `(${value})`,
    })
    fetchAndCache('emails')
    // history.push('/SearchView')
  }

  return (
    <>
      <AppHeader title="Pie" />
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
