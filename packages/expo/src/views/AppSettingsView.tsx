import {
  Custodian,
  getCustodiansAsync,
  selectCustodians,
  selectCustodiansLoading,
  selectDarkMode,
  setDarkMode,
  x2Server,
} from '@klonzo/common'
import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import ColorPickerDlg from '../components/ColorPickerDlg'

export default function AppSettingsView() {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [colorPickerDefault, setColorPickerDefault] = useState('')
  const [colorPickerItem, setColorPickerItem] = useState('')
  const [colorPickerDlgOpen, setColorPickerDlgOpen] = useState(false)
  const custodiansLoading = useSelector(selectCustodiansLoading)
  const custodians = useSelector(selectCustodians)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    custodianContainer: {
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      paddingTop: 5,
      paddingLeft: 15,
      color: darkMode ? 'white' : 'black',
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
      marginTop: 10,
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

  const handleColorChosen = (color: string) => {
    setColorPickerDlgOpen(false)
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const url = `${server}/custodians/${colorPickerItem}`
    const payload = {
      method: 'PUT',
      body: JSON.stringify({ color }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
    fetch(url, payload)
      .then(() => getCustodiansAsync())
      .catch((error) => console.error('AppSettingsView', error))
  }

  const chooseColor = (item: string, defaultColor: string) => {
    setColorPickerItem(item)
    setColorPickerDefault(defaultColor)
    setColorPickerDlgOpen(true)
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
            onPress={() => chooseColor(custodian.id, custodian.color)}
            testID={custodian.id}
          />
        </View>
      </View>
    </View>
  )

  const DarkModeSwitch = () => (
    <View style={styles.itemRow}>
      <Text style={styles.text}>Dark mode {darkMode ? 'on' : 'off'}</Text>
      <Switch
        value={darkMode}
        onValueChange={() => dispatch(setDarkMode(darkMode ? false : true))}
      />
    </View>
  )

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ColorPickerDlg
          open={colorPickerDlgOpen}
          defaultColor={colorPickerDefault}
          onClose={handleColorChosen}
          onCancel={() => setColorPickerDlgOpen(false)}
        />
        <ScrollView>
          <DarkModeSwitch />
          <Spinner visible={custodiansLoading} textContent={'Loading...'} />
          {custodians &&
            custodians.map((custodian) => renderCustodian(custodian))}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
