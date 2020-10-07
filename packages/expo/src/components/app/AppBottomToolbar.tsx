import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation'
import { useHistory } from 'react-router-native'

// https://www.npmjs.com/package/react-native-material-bottom-navigation

export default function AppBottomToolbar() {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState('home')
  const tabs = [
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      barColor: '#2196f3',
      route: '/',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'search',
      icon: 'search',
      label: 'Search',
      barColor: '#2196f3',
      route: '/SearchView',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'settings',
      icon: 'settings',
      label: 'Settings',
      barColor: '#2196f3',
      route: '/AppSettingsView',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
  ]

  const renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={() => <Icon size={24} color="white" name={tab.icon} />}
    />
  )

  return (
    <BottomNavigation
      activeTab={activeTab}
      onTabPress={(tab: any) => {
        history.push(tab.route)
        setActiveTab(tab.key)
      }}
      renderTab={renderTab}
      tabs={tabs}
    />
  )
}
