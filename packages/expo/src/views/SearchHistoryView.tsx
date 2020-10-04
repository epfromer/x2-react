import {
  getEmailAsync,
  searchHistoryExecute,
  selectDarkMode,
  selectSearchHistory,
  selectSearchHistoryLoading,
} from '@klonzo/common'
import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'

interface Props {
  navigation: any
}
export default function SearchHistoryView({ navigation }: Props) {
  const darkMode = useSelector(selectDarkMode)
  const searchHistory = useSelector(selectSearchHistory)
  const searchHistoryLoading = useSelector(selectSearchHistoryLoading)

  const styles = StyleSheet.create({
    bold: {
      fontSize: 15,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    },
    container: {
      flex: 1,
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

  function handleClick(entry: string) {
    searchHistoryExecute(entry)
    getEmailAsync()
    navigation.navigate('SearchView')
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => handleClick(item.entry)}>
      <View style={styles.itemContainer}>
        <View style={styles.spaceBetweenRow}>
          <Text numberOfLines={4} style={styles.text}>
            {item.timestamp} {item.entry}
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
    </SafeAreaView>
  )
}
