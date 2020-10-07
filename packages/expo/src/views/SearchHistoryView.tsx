import {
  getEmailAsync,
  getSearchHistoryAsync,
  searchHistoryExecute,
  selectDarkMode,
  selectSearchHistory,
  x2Server,
} from '@klonzo/common'
import { gql, request } from 'graphql-request'
import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'

export default function SearchHistoryView() {
  const history = useHistory()
  const darkMode = useSelector(selectDarkMode)
  const searchHistory = useSelector(selectSearchHistory)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#222222' : 'white',
    },
    bold: {
      fontSize: 15,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
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
      color: darkMode ? 'white' : 'black',
      marginBottom: 10,
    },
  })

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
      .then(() => getSearchHistoryAsync())
      .catch((error) => console.error('CustodianSettings', error))
  }

  const onSearchHistory = (entry: string) => {
    searchHistoryExecute(entry)
    getEmailAsync()
    history.push('/SearchView')
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

  return (
    <SafeAreaView style={styles.container}>
      {searchHistory && searchHistory.length !== 0 && (
        <FlatList
          data={searchHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button
        buttonStyle={styles.historyButton}
        onPress={onClearHistory}
        title="Clear History"
      />
    </SafeAreaView>
  )
}
