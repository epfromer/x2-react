import { Spinner, Text } from 'native-base'
import React from 'react'
import { StyleSheet, View, FlatList, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/types'

export default function ContactSettings() {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const contacts = useSelector((state: RootState) => state.contacts)
  const contactsLoading = useSelector(
    (state: RootState) => state.contactsLoading
  )
  const styles = StyleSheet.create({
    itemContainer: {
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
    },
    title: {
      fontSize: 15,
      paddingTop: 5,
      paddingLeft: 15,
      color: darkMode ? 'white' : 'black',
    },
    button: {
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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

  function handleColorChosen(color: string) {
    console.log(color)
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <View>
          <Text>{item.name}</Text>
        </View>
        <View>
          <Text>foo</Text>
        </View>
      </View>
    </View>
  )

  return (
    <>
      {contactsLoading && (
        <View style={styles.loading}>
          <Spinner color={themePrimaryColor} />
        </View>
      )}
      {contacts && (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </>
  )
}
