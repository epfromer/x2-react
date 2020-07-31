import { Button, Form, Icon, Input, Item, Label, Spinner } from 'native-base'
import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Col, Grid } from 'react-native-easy-grid'
import Modal from 'react-native-modal'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import { RootState } from '../store/types'
import { fetchAndCache, setReduxState } from './../store'
import { EMAIL_LIST_PAGE_LENGTH, MAX_FROM_LENGTH } from './../store/constants'
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
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    filterButton: {
      padding: 5,
    },
    dlgContainer: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    button: {
      margin: 15,
      backgroundColor: themePrimaryColor,
    },
    itemContainer: {
      margin: 5,
    },
    itemTopRow: {
      flexDirection: 'row',
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
    // https://www.npmjs.com/package/react-native-easy-grid

    const [newAllText, setNewAllText] = useState(allText)
    const [newFrom, setNewFrom] = useState(from)
    const [newTo, setNewTo] = useState(to)
    const [newSubject, setNewSubject] = useState(subject)
    const [newSent, setNewSent] = useState(sent)
    const [datePickerOpen, setDatePickerOpen] = useState(false)

    function doQuery() {
      if (newAllText !== allText) setReduxState('allText', newAllText)
      if (newFrom !== from) setReduxState('from', newFrom)
      if (newTo !== to) setReduxState('to', newTo)
      if (newSubject !== subject) setReduxState('subject', newSubject)
      if (newSent !== sent) setReduxState('sent', newSent)
      fetchAndCache('emails')
      setDlgOpen(false)
    }

    function SentDatePicker() {
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
        <ScrollView>
          <Form>
            <SentDatePicker />
            <Item floatingLabel>
              <Label>Filter (all text fields)</Label>
              <Input
                defaultValue={allText}
                value={newAllText}
                onChangeText={(s) => setNewAllText(s)}
                style={{ color: darkMode ? 'white' : 'black' } as any}
              />
            </Item>
            <Item floatingLabel>
              <Label>Filter Sent</Label>
              <Input
                defaultValue={sent}
                value={newSent}
                onChangeText={(s) => setNewSent(s)}
                style={{ color: darkMode ? 'white' : 'black' } as any}
              />
              <Icon
                name="calendar"
                style={{ color: darkMode ? 'white' : 'black' } as any}
                onPress={() => setDatePickerOpen(true)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Filter From</Label>
              <Input
                defaultValue={from}
                value={newFrom}
                onChangeText={(s) => setNewFrom(s)}
                style={{ color: darkMode ? 'white' : 'black' } as any}
              />
            </Item>
            <Item floatingLabel>
              <Label>Filter To</Label>
              <Input
                defaultValue={to}
                value={newTo}
                onChangeText={(s) => setNewTo(s)}
                style={{ color: darkMode ? 'white' : 'black' } as any}
              />
            </Item>
            <Item floatingLabel>
              <Label>Filter Subject</Label>
              <Input
                defaultValue={subject}
                value={newSubject}
                onChangeText={(s) => setNewSubject(s)}
                style={{ color: darkMode ? 'white' : 'black' } as any}
              />
            </Item>
            <Grid>
              <Col>
                <Button
                  block
                  small
                  style={styles.button}
                  onPress={() => setDlgOpen(false)}
                >
                  <Text>Cancel</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  small
                  style={styles.button}
                  onPress={() => doQuery()}
                >
                  <Text>Search</Text>
                </Button>
              </Col>
            </Grid>
          </Form>
        </ScrollView>
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
        <View style={styles.itemTopRow}>
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
    return s
  }

  return (
    <>
      <AppHeader title="Search" />
      <SafeAreaView style={styles.container}>
        <SearchDlg />
        <Button
          full
          light
          style={styles.filterButton}
          onPress={() => setDlgOpen(true)}
        >
          <Text>Filters: {filterList()}</Text>
        </Button>
        {emailsLoading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
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
