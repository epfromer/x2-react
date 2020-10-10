import React, { useContext, useState } from 'react'
import { Icon, ThemeContext } from 'react-native-elements'
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation'
import { useHistory } from 'react-router-native'
import { textColor } from '../appThemes'

// https://www.npmjs.com/package/react-native-material-bottom-navigation

export default function AppBottomToolbar() {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState('home')
  const { theme }: any = useContext(ThemeContext)
  const barColor = theme.Header.containerStyle.backgroundColor

  const tabs = [
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      barColor,
      route: '/',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'search',
      icon: 'search',
      label: 'Search',
      barColor,
      route: '/SearchView',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'settings',
      icon: 'settings',
      label: 'Settings',
      barColor,
      route: '/AppSettingsView',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
  ]

  const renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      labelStyle={{ color: textColor(theme) }}
      renderIcon={() => (
        <Icon size={24} color={textColor(theme)} name={tab.icon} />
      )}
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
