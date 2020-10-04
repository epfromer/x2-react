import { selectDarkMode } from '@klonzo/common'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import AppSettingsView from '../views/AppSettingsView'
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

// const GuardedRoute = ({ component: Component, auth, ...rest }: any) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       auth === true ? <Component {...props} /> : <Redirect to="/SignInView" />
//     }
//   />
// )

const HomeStack = createStackNavigator()
const HomeStackNavi = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen
      name="PieView"
      component={PieView}
      options={{ title: 'Pie' }}
    />
    <HomeStack.Screen
      name="BarView"
      component={BarView}
      options={{ title: 'Bar' }}
    />
    <HomeStack.Screen
      name="NetworkGraphView"
      component={NetworkGraphView}
      options={{ title: 'Network Graph' }}
    />
    <HomeStack.Screen
      name="PolarView"
      component={PolarView}
      options={{ title: 'Polar' }}
    />
    <HomeStack.Screen
      name="TreeMapView"
      component={TreeMapView}
      options={{ title: 'Tree Map' }}
    />
    <HomeStack.Screen
      name="VolumeTimelineView"
      component={VolumeTimelineView}
      options={{ title: 'Volume Timeline' }}
    />
    <HomeStack.Screen
      name="Home"
      component={HomeView}
      options={{ title: 'x2 Home' }}
    />
  </HomeStack.Navigator>
)

const SearchStack = createStackNavigator()
const SearchStackNavi = () => (
  <SearchStack.Navigator initialRouteName="SearchView">
    <SearchStack.Screen
      name="SearchView"
      component={SearchView}
      options={{ title: 'Search' }}
    />
    <SearchStack.Screen
      name="EmailDetail"
      component={EmailDetailView}
      options={{ title: 'Email Detail' }}
    />
  </SearchStack.Navigator>
)

const SettingsStack = createStackNavigator()
const SettingsStackNavi = () => (
  <SettingsStack.Navigator initialRouteName="SignInView">
    <SettingsStack.Screen
      name="SignInView"
      component={SignInView}
      options={{ title: 'Sign In' }}
    />
    <SettingsStack.Screen
      name="AppSettingsView"
      component={AppSettingsView}
      options={{ title: 'Settings' }}
    />
  </SettingsStack.Navigator>
)

const TabNavi = createMaterialBottomTabNavigator()

export default function RouteSwitch() {
  const darkMode = useSelector(selectDarkMode)
  const styles = StyleSheet.create({
    bottomTab: {
      backgroundColor: darkMode ? 'black' : 'white',
    },
  })

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <TabNavi.Navigator
        barStyle={styles.bottomTab}
        activeColor="#2196f3"
        shifting
      >
        <TabNavi.Screen
          name="Home"
          component={HomeStackNavi}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <TabNavi.Screen
          name="Search"
          component={SearchStackNavi}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <TabNavi.Screen
          name="Settings"
          component={SettingsStackNavi}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="settings" color={color} size={26} />
            ),
          }}
        />
      </TabNavi.Navigator>
    </NavigationContainer>
  )
}
