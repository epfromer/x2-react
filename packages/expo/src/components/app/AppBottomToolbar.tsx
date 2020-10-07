import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation'
import { useHistory, useLocation } from 'react-router-native'

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
      route: '/',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
  ]

  const renderIcon = (icon) => () => (
    <Icon size={24} color="white" name={icon} />
  )

  const renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={renderIcon(tab.icon)}
    />
  )

  return (
    <BottomNavigation
      activeTab={activeTab}
      onTabPress={(tab) => console.log(tab)}
      renderTab={renderTab}
      tabs={tabs}
    />
  )
}
