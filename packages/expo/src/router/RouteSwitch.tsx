import React from 'react'
import { Route, Switch } from 'react-router-native'
import BarView from '../views/BarView'
import EmailDetailView from '../views/EmailDetailView'
import HomeView from '../views/HomeView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import PolarView from '../views/PolarView'
import SearchView from '../views/SearchView'
import SignInView from '../views/SignInView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'
import SearchHistoryView from '../views/SearchHistoryView'

// const GuardedRoute = ({ component: Component, auth, ...rest }: any) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       auth === true ? <Component {...props} /> : <Redirect to="/SignInView" />
//     }
//   />
// )

export const routeNames = {
  '/AppSettingsView': 'Settings',
  '/SignInView': 'Sign In',
  '/SearchView': 'Search',
  '/PieView': 'Pie',
  '/BarView': 'Bar',
  '/NetworkGraphView': 'Network Graph',
  '/PolarView': 'Polar',
  '/TreeMapView': 'Tree Map',
  '/VolumeTimelineView': 'Volume Timeline',
  '/EmailDetailView': 'Email Detail',
  '/': 'Home',
}

export default function RouteSwitch() {
  // const authenticated = useSelector(selectAuthenticated)

  return (
    <Switch>
      {/* <GuardedRoute
        path="/AppSettingsView"
        component={AppSettingsView}
        auth={authenticated}
      /> */}
      <Route path="/SignInView">
        <SignInView />
      </Route>
      <Route path="/SearchHistoryView">
        <SearchHistoryView />
      </Route>
      <Route path="/SearchView">
        <SearchView data-testid="switch" />
      </Route>
      <Route path="/PieView">
        <PieView />
      </Route>
      <Route path="/BarView">
        <BarView />
      </Route>
      <Route path="/NetworkGraphView">
        <NetworkGraphView />
      </Route>
      <Route path="/PolarView">
        <PolarView />
      </Route>
      <Route path="/TreeMapView">
        <TreeMapView />
      </Route>
      <Route path="/VolumeTimelineView">
        <VolumeTimelineView />
      </Route>
      <Route path="/EmailDetailView/:id">
        <EmailDetailView />
      </Route>
      <Route exact path="/">
        <HomeView />
      </Route>
    </Switch>
  )
}

// const HomeStack = createStackNavigator()
// const HomeStackNavi = () => (
//   <HomeStack.Navigator initialRouteName="Home">
//     <HomeStack.Screen
//       name="PieView"
//       component={PieView}
//       options={{ title: 'Pie' }}
//     />
//     <HomeStack.Screen
//       name="BarView"
//       component={BarView}
//       options={{ title: 'Bar' }}
//     />
//     <HomeStack.Screen
//       name="NetworkGraphView"
//       component={NetworkGraphView}
//       options={{ title: 'Network Graph' }}
//     />
//     <HomeStack.Screen
//       name="PolarView"
//       component={PolarView}
//       options={{ title: 'Polar' }}
//     />
//     <HomeStack.Screen
//       name="TreeMapView"
//       component={TreeMapView}
//       options={{ title: 'Tree Map' }}
//     />
//     <HomeStack.Screen
//       name="VolumeTimelineView"
//       component={VolumeTimelineView}
//       options={{ title: 'Volume Timeline' }}
//     />
//     <HomeStack.Screen
//       name="Home"
//       component={HomeView}
//       options={{ title: 'x2 Home' }}
//     />
//     <HomeStack.Screen
//       name="SearchView"
//       component={SearchView}
//       options={{ title: 'Search' }}
//     />
//     <HomeStack.Screen
//       name="EmailDetail"
//       component={EmailDetailView}
//       options={{ title: 'Email Detail' }}
//     />
//   </HomeStack.Navigator>
// )

// const SearchStack = createStackNavigator()
// const SearchStackNavi = () => (
//   <SearchStack.Navigator initialRouteName="SearchView">
//     <SearchStack.Screen
//       name="SearchView"
//       component={SearchView}
//       options={{ title: 'Search' }}
//     />
//     <SearchStack.Screen
//       name="SearchHistoryView"
//       component={SearchHistoryView}
//       options={{ title: 'Search History' }}
//     />
//     <SearchStack.Screen
//       name="EmailDetail"
//       component={EmailDetailView}
//       options={{ title: 'Email Detail' }}
//     />
//   </SearchStack.Navigator>
// )

// const SettingsStack = createStackNavigator()
// const SettingsStackNavi = () => (
//   <SettingsStack.Navigator initialRouteName="SignInView">
//     <SettingsStack.Screen
//       name="SignInView"
//       component={SignInView}
//       options={{ title: 'Sign In' }}
//     />
//     <SettingsStack.Screen
//       name="AppSettingsView"
//       component={AppSettingsView}
//       options={{ title: 'Settings' }}
//     />
//   </SettingsStack.Navigator>
// )

// const TabNavi = createMaterialBottomTabNavigator()

// export default function RouteSwitch() {
//   const darkMode = useSelector(selectDarkMode)
//   const styles = StyleSheet.create({
//     bottomTab: {
//       backgroundColor: darkMode ? 'black' : 'white',
//     },
//   })

//   return (
//     <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
//       <TabNavi.Navigator
//         barStyle={styles.bottomTab}
//         activeColor="#2196f3"
//         shifting
//       >
//         <TabNavi.Screen
//           name="Home"
//           component={HomeStackNavi}
//           options={{
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color }) => (
//               <MaterialCommunityIcons name="home" color={color} size={26} />
//             ),
//           }}
//         />
//         <TabNavi.Screen
//           name="Search"
//           component={SearchStackNavi}
//           options={{
//             tabBarLabel: 'Search',
//             tabBarIcon: ({ color }) => (
//               <MaterialCommunityIcons name="magnify" color={color} size={26} />
//             ),
//           }}
//         />
//         <TabNavi.Screen
//           name="Settings"
//           component={SettingsStackNavi}
//           options={{
//             tabBarLabel: 'Settings',
//             tabBarIcon: ({ color }) => (
//               <MaterialCommunityIcons name="settings" color={color} size={26} />
//             ),
//           }}
//         />
//       </TabNavi.Navigator>
//     </NavigationContainer>
//   )
// }
