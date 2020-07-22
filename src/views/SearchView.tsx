import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import { RootState } from '../store/types'
import { fetchAndCache } from './../store'
import { EMAIL_LIST_PAGE_LENGTH, MAX_FROM_LENGTH } from './../store/constants'

// TODO - VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 3030, "dt": 1195, "prevDt": 5812}

export default function SearchView() {
  const dispatch = useDispatch()
  const emails = useSelector((state: RootState) => state.emails)
  const totalEmails = useSelector((state: RootState) => state.totalEmails)
  const emailListPage = useSelector((state: RootState) => state.emailListPage)

  const maxString = (s: string, maxLen: number): string => {
    if (s.length > maxLen) {
      return s.substring(0, maxLen - 1) + '...'
    } else {
      return s
    }
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => console.log(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemTopRow}>
          <View>
            <Text numberOfLines={1} style={styles.emailFromText}>
              {maxString(item.from, MAX_FROM_LENGTH)}
            </Text>
          </View>
          <View>
            <Text numberOfLines={1}>{item.sent.substring(0, 10)}</Text>
          </View>
        </View>
        <View style={styles.emailSubject}>
          <Text numberOfLines={1}>{item.subject}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const hasMore = () =>
    (emailListPage + 1) * EMAIL_LIST_PAGE_LENGTH < totalEmails

  const handleLoadMore = () => {
    if (hasMore()) {
      dispatch({
        type: 'setReduxState',
        key: 'emailListPage',
        value: emailListPage + 1,
      })
      fetchAndCache('emails', false, true)
    }
  }

  return (
    <>
      <AppHeader title="Search" />
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    margin: 5,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailFromText: {
    fontSize: 15,
  },
  emailSubject: {
    width: '100%',
  },
  title: {
    fontSize: 15,
  },
})
