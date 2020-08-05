import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'

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

// const Drawer = createDrawerNavigator()

export default function RouteSwitch() {
  return (
    <View style={styles.container}>
      <Text>foo</Text>
    </View>
  )
}

// export default function RouteSwitch() {
//   const darkMode = useSelector((state: RootState) => state.darkMode)

//   return (
//     <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
//       <Drawer.Navigator initialRouteName="DashboardView">
//         <Drawer.Screen
//           name="PieView"
//           component={PieView}
//           options={{ title: 'Pie' }}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
