// import { Body, Card, CardItem } from 'native-base'
import { Spinner } from 'native-base'
import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import { RootState } from '../store/types'

export default function SearchView() {
  const emailsLoading = useSelector((state: RootState) => state.emailsLoading)
  const emails = useSelector((state: RootState) => state.emails)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  const Item = ({ title }: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )

  const renderItem = ({ item }: any) => <Item title={item.subject} />

  return (
    <>
      <AppHeader title="Search" />
      <SafeAreaView style={styles.container}>
        {emailsLoading && <Spinner color={themePrimaryColor} />}
        {emails && (
          <FlatList
            data={emails}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
})
