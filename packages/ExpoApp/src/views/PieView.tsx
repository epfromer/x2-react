import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// import { useSelector } from 'react-redux'
// import AppHeader from '../components/AppHeader'
// import PieECharts from '../components/ECharts/PieECharts'
// import PieVictory from '../components/Victory/PieVictory'
// import {
//   clearSearch,
//   fetchAndCache,
//   getEmailReceivers,
//   getEmailSenders,
//   setReduxState,
// } from './../store'
// import { RootState } from './../store/types'

// https://docs.nativebase.io/Components.html#picker-def-headref

interface Props {
  route: any
  navigation: any
}
export default function PieView({ navigation }: Props) {
  // const [isSenders, setIsSenders] = useState(true)
  // const [chartLib, setChartLib] = useState('ECharts')
  // const contactsLoading = useSelector(
  //   (state: RootState) => state.contactsLoading
  // )
  // const contacts = useSelector((state: RootState) => state.contacts)
  // const emailSenders = useSelector((state: RootState) => getEmailSenders(state))
  // const emailReceivers = useSelector((state: RootState) =>
  //   getEmailReceivers(state)
  // )
  // const themePrimaryColor = useSelector(
  //   (state: RootState) => state.themePrimaryColor
  // )

  // function handleClick(search: string, value: string) {
  //   clearSearch()
  //   setReduxState(search, `(${value})`)
  //   fetchAndCache('emails')
  //   navigation.navigate('SearchView')
  // }

  return (
    <View style={styles.container}>
      <Text>PieView</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
