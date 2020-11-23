import {
  clearSearch,
  getEmailAsync,
  SearchHistoryEntry,
  setAllText,
  setBody,
  setFrom,
  setOrder,
  setSent,
  setSort,
  setSubject,
  setTo,
  store,
  x2Server,
} from '@klonzo/common'
import { gql, request } from 'graphql-request'
import React, { useContext, useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, ThemeContext } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useHistory } from 'react-router-native'

export default function SearchHistoryView() {
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)
  const [log, setLog] = useState<SearchHistoryEntry[]>([])
  const [logLoading, setLogLoading] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    bold: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme.colors.black,
    },

    historyButton: {
      margin: 1,
      padding: 10,
    },
    itemContainer: {
      margin: 5,
    },
    spaceBetweenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      color: theme.colors.black,
      marginBottom: 10,
    },
  })

  const getSearchHistory = (): void => {
    setLogLoading(true)
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const query = gql`
      {
        getSearchHistory {
          id
          timestamp
          entry
        }
      }
    `
    request(`${server}/graphql/`, query)
      .then((data) => {
        setLog(data.getSearchHistory)
        setLogLoading(false)
      })
      .catch((e) => console.error(e))
  }

  const onSearchHistory = (entry: string) => {
    const o = JSON.parse(entry)
    store.dispatch(clearSearch())
    if (o.hasOwnProperty('sort')) store.dispatch(setSort(o.sort))
    if (o.hasOwnProperty('order')) store.dispatch(setOrder(o.order))
    if (o.hasOwnProperty('sent')) store.dispatch(setSent(o.sent))
    if (o.hasOwnProperty('from')) store.dispatch(setFrom(o.from))
    if (o.hasOwnProperty('to')) store.dispatch(setTo(o.to))
    if (o.hasOwnProperty('subject')) store.dispatch(setSubject(o.subject))
    if (o.hasOwnProperty('allText')) store.dispatch(setAllText(o.allText))
    if (o.hasOwnProperty('body')) store.dispatch(setBody(o.body))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  const onClearHistory = () => {
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const mutation = gql`
      mutation {
        clearSearchHistory
      }
    `
    request(`${server}/graphql/`, mutation)
      .then(() => getSearchHistory())
      .catch((e) => console.error(e))
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => onSearchHistory(item.entry)}>
      <View style={styles.itemContainer}>
        <View style={styles.spaceBetweenRow}>
          <Text numberOfLines={4} style={styles.text}>
            {item.timestamp.substring(0, 10)} {item.entry}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  useEffect(() => {
    getSearchHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={logLoading} textContent={'Loading...'} />
      {log && log.length !== 0 && (
        <FlatList
          data={log}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button
        buttonStyle={styles.historyButton}
        onPress={onClearHistory}
        testID="clear-history"
        title="Clear History"
      />
      {process.env.NODE_ENV === 'test' && (
        <Button
          onPress={() => onSearchHistory('{"to":"ba"}')}
          testID="test-click"
        />
      )}
    </SafeAreaView>
  )
}
