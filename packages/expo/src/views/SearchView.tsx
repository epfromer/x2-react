import {
  EMAIL_LIST_PAGE_LENGTH,
  fetchAndCache,
  MAX_FROM_LENGTH,
  RootState,
  setReduxState,
} from '@klonzo/shared'
import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from 'react-native-modal'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useSelector } from 'react-redux'
var moment = require('moment')

// TODO - VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 3030, "dt": 1195, "prevDt": 5812}

const FILTER_DATE = '2000-10-04'

interface Props {
  route: any
  navigation: any
}
export default function SearchView({ navigation }: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const allText = useSelector((state: RootState) => state.allText)
  const from = useSelector((state: RootState) => state.from)
  const to = useSelector((state: RootState) => state.to)
  const subject = useSelector((state: RootState) => state.subject)
  const sent = useSelector((state: RootState) => state.sent)
  const [dlgOpen, setDlgOpen] = useState(false)
  const emails = useSelector((state: RootState) => state.emails)
  const totalEmails = useSelector((state: RootState) => state.totalEmails)
  const emailListPage = useSelector((state: RootState) => state.emailListPage)
  const emailsLoading = useSelector((state: RootState) => state.emailsLoading)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    filterButton: {
      padding: 5,
      height: 60,
    },
    dlgContainer: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    button: {
      width: 80,
    },
    itemContainer: {
      margin: 5,
    },
    spaceBetweenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    spaceBetweenColumn: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    bold: {
      fontSize: 15,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    },
    text: {
      color: darkMode ? 'white' : 'black',
    },
    title: {
      fontSize: 15,
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

  function SearchDlg() {
    // https://www.npmjs.com/package/react-native-modal

    const [newAllText, setNewAllText] = useState(allText)
    const [newFrom, setNewFrom] = useState(from)
    const [newTo, setNewTo] = useState(to)
    const [newSubject, setNewSubject] = useState(subject)
    const [newSent, setNewSent] = useState(sent)
    const [datePickerOpen, setDatePickerOpen] = useState(false)

    const doQuery = () => {
      if (newAllText !== allText) setReduxState('allText', newAllText)
      if (newFrom !== from) setReduxState('from', newFrom)
      if (newTo !== to) setReduxState('to', newTo)
      if (newSubject !== subject) setReduxState('subject', newSubject)
      if (newSent !== sent) setReduxState('sent', newSent)
      fetchAndCache('emails')
      setDlgOpen(false)
    }

    const clearFields = () => {
      setNewAllText('')
      setNewFrom('')
      setNewTo('')
      setNewSubject('')
      setNewSent('')
    }

    const SentDatePicker = () => {
      // use https://github.com/mmazzarolo/react-native-modal-datetime-picker

      const initialDate = sent ? new Date(sent) : new Date(FILTER_DATE)

      return (
        <DateTimePickerModal
          isVisible={datePickerOpen}
          isDarkModeEnabled={darkMode}
          date={initialDate}
          mode="date"
          onConfirm={(date: Date) => {
            setDatePickerOpen(false)
            setNewSent(moment(date).format().slice(0, 10))
          }}
          onCancel={() => {
            setDatePickerOpen(false)
          }}
        />
      )
    }

    return (
      <Modal
        isVisible={dlgOpen}
        backdropOpacity={0.95}
        backdropColor={darkMode ? 'black' : 'white'}
        supportedOrientations={['portrait', 'landscape']}
      >
        <SafeAreaView>
          <SentDatePicker />
          <View style={styles.spaceBetweenColumn}>
            <Input
              label="Filter (all text fields)"
              labelStyle={styles.text}
              inputStyle={styles.text}
              value={newAllText}
              onChangeText={(s) => setNewAllText(s)}
              rightIcon={
                <Icon
                  name="close"
                  iconStyle={styles.text}
                  onPress={() => setNewAllText('')}
                />
              }
            />
            <Input
              label="Filter Sent"
              labelStyle={styles.text}
              inputStyle={styles.text}
              value={newSent}
              onChangeText={(s) => setNewSent(s)}
              rightIcon={
                <Icon
                  name="date-range"
                  iconStyle={styles.text}
                  onPress={() => setDatePickerOpen(true)}
                />
              }
            />
            <Input
              label="Filter From"
              labelStyle={styles.text}
              inputStyle={styles.text}
              value={newFrom}
              onChangeText={(s) => setNewFrom(s)}
              rightIcon={
                <Icon
                  name="close"
                  iconStyle={styles.text}
                  onPress={() => setNewFrom('')}
                />
              }
            />
            <Input
              label="Filter To"
              labelStyle={styles.text}
              inputStyle={styles.text}
              value={newTo}
              onChangeText={(s) => setNewTo(s)}
              rightIcon={
                <Icon
                  name="close"
                  iconStyle={styles.text}
                  onPress={() => setNewTo('')}
                />
              }
            />
            <Input
              label="Filter Subject"
              labelStyle={styles.text}
              inputStyle={styles.text}
              value={newSubject}
              onChangeText={(s) => setNewSubject(s)}
              rightIcon={
                <Icon
                  name="close"
                  iconStyle={styles.text}
                  onPress={() => setNewSubject('')}
                />
              }
            />
            <View style={styles.spaceBetweenRow}>
              <Button
                buttonStyle={styles.button}
                onPress={() => setDlgOpen(false)}
                title="Cancel"
              />
              <Button
                buttonStyle={styles.button}
                onPress={() => clearFields()}
                title="Clear"
              />
              <Button
                buttonStyle={styles.button}
                onPress={() => doQuery()}
                title="Search"
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

  const maxString = (s: string, maxLen: number): string => {
    if (s.length > maxLen) {
      return s.substring(0, maxLen - 1) + '...'
    } else {
      return s
    }
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EmailDetail', { id: item._id })}
    >
      <View style={styles.itemContainer}>
        <View style={styles.spaceBetweenRow}>
          <View>
            <Text numberOfLines={1} style={styles.bold}>
              {maxString(item.from, MAX_FROM_LENGTH)}
            </Text>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.text}>
              {item.sent.substring(0, 10)}
            </Text>
          </View>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.text}>
            {item.subject}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const hasMore = () =>
    (emailListPage + 1) * EMAIL_LIST_PAGE_LENGTH < totalEmails

  const handleLoadMore = () => {
    if (hasMore()) {
      setReduxState('emailListPage', emailListPage + 1)
      fetchAndCache('emails', false, true)
    }
  }

  const filterList = () => {
    let s = ''
    if (allText) s += `allText=${allText} `
    if (from) s += `from=${from} `
    if (to) s += `to=${to} `
    if (subject) s += `subject=${subject} `
    if (sent) s += `sent=${sent} `
    if (s === '') s = 'none'
    return 'Filters: ' + s
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SearchDlg />
        <Button
          buttonStyle={styles.filterButton}
          onPress={() => setDlgOpen(true)}
          title={filterList()}
        />
        <Spinner visible={emailsLoading} textContent={'Loading...'} />
        {emails && (
          <FlatList
            data={emails}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={EMAIL_LIST_PAGE_LENGTH}
          />
        )}
        {emails && emails.length === 0 && !emailsLoading && (
          <View style={styles.loading}>
            <Text>Nothing found</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  )
}
