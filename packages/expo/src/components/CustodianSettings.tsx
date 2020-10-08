import {
  Custodian,
  selectCustodians,
  selectCustodiansLoading,
  selectDarkMode,
  setCustodians,
  x2Server,
} from '@klonzo/common'
import { gql, request } from 'graphql-request'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import ColorPickerDlg from '../components/ColorPickerDlg'

export default function CustodianSettings() {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [colorPickerDlgOpen, setColorPickerDlgOpen] = useState(false)
  const [pickedColor, setPickedColor] = useState('')
  const [custodianId, setCustodianId] = useState('')
  const custodiansLoading = useSelector(selectCustodiansLoading)
  const custodians = useSelector(selectCustodians)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    custodianContainer: {
      marginTop: 10,
    },
    text: {
      marginTop: 5,
      color: darkMode ? 'white' : 'black',
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 10,
      marginRight: 10,
    },
  })

  const handleColorChosen = (color: string) => {
    setColorPickerDlgOpen(false)
    if (!color) return
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const mutation = gql`
      mutation setCustodianColor($id: ID, $color: String) {
        setCustodianColor(id: $id, color: $color) {
          id
          name
          title
          color
          senderTotal
          receiverTotal
          toCustodians {
            custodianId
            total
          }
        }
      }
    `
    request(`${server}/graphql/`, mutation, { id: custodianId, color })
      .then((data) => dispatch(setCustodians(data.setCustodianColor)))
      .catch((error) => console.error('CustodianSettings', error))
  }

  const renderCustodian = (custodian: Custodian) => (
    <View style={styles.custodianContainer} key={custodian.id}>
      <View style={styles.itemRow}>
        <View>
          <Text style={styles.text}>{custodian.name}</Text>
        </View>
        <View>
          <Button
            buttonStyle={
              {
                backgroundColor: custodian.color,
                width: 100,
                height: 30,
              } as any
            }
            onPress={() => {
              setCustodianId(custodian.id)
              setPickedColor(custodian.color)
              setColorPickerDlgOpen(true)
            }}
            testID={custodian.id}
          />
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ColorPickerDlg
        open={colorPickerDlgOpen}
        defaultColor={pickedColor}
        onClose={handleColorChosen}
        onCancel={() => setColorPickerDlgOpen(false)}
      />
      <ScrollView>
        <Spinner visible={custodiansLoading} textContent={'Loading...'} />
        {custodians?.map((custodian) => renderCustodian(custodian))}
      </ScrollView>
    </SafeAreaView>
  )
}
