import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
// import 'react-native-gesture-handler'
// import { useSelector } from 'react-redux'
// import { RootState } from '../store/types'
// import DashboardView from '../views/DashboardView'

// import AppSettingsView from '../views/AppSettingsView'
// import BarView from '../views/BarView'
// import ChordView from '../views/ChordView'
// import DashboardView from '../views/DashboardView'
// import EmailDetailView from '../views/EmailDetailView'
// import EventTimelineView from '../views/EventTimelineView'
// import NetworkGraphView from '../views/NetworkGraphView'
// import PolarView from '../views/PolarView'
// import SearchView from '../views/SearchView'
// import TreeMapView from '../views/TreeMapView'
// import VolumeTimelineView from '../views/VolumeTimelineView'
// import WordCloudView from '../views/WordCloudView'

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   )
// }

// const Drawer = createDrawerNavigator()

// export default function RouteSwitch() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  )
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  )
}

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
