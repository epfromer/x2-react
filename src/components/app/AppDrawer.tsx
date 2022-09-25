import {
  Autorenew,
  BarChart,
  Cloud,
  DeviceHub,
  Home,
  PieChart,
  Search,
  Timeline,
  ViewQuilt,
} from '@mui/icons-material'
import { Divider, Drawer, MenuList } from '@mui/material'
import React from 'react'
import NavListItem from './NavListItem'

// https://material-ui.com/components/material-icons/

interface Props {
  open: boolean
  setOpen: (s: boolean) => void
}
export default function AppDrawer({ open, setOpen }: Props) {
  const mainListItems = [
    { icon: <Home fontSize="small" />, name: 'x2 Home', route: '/' },
    { icon: <Search fontSize="small" />, name: 'Search', route: '/SearchView' },
  ]

  const secondaryListItems = [
    {
      icon: <Autorenew fontSize="small" />,
      name: 'Chord',
      route: '/ChordView',
    },
    {
      icon: <Cloud fontSize="small" />,
      name: 'Word Cloud',
      route: '/WordCloudView',
    },
    {
      icon: <DeviceHub fontSize="small" />,
      name: 'Network Graph',
      route: '/NetworkGraphView',
    },
    {
      icon: <Timeline fontSize="small" />,
      name: 'Volume Timeline',
      route: '/VolumeTimelineView',
    },
    {
      icon: <ViewQuilt fontSize="small" />,
      name: 'Tree Map',
      route: '/TreeMapView',
    },
    {
      icon: <Timeline fontSize="small" />,
      name: 'Event Timeline',
      route: '/EventTimelineView',
    },
    { icon: <BarChart fontSize="small" />, name: 'Bar', route: '/BarView' },
    { icon: <PieChart fontSize="small" />, name: 'Pie', route: '/PieView' },
  ]

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(false)}
    >
      <MenuList>
        {mainListItems.map((item) => (
          <NavListItem
            icon={item.icon}
            name={item.name}
            route={item.route}
            key={item.name}
          />
        ))}
      </MenuList>
      <Divider />
      <MenuList>
        {secondaryListItems.map((item) => (
          <NavListItem
            icon={item.icon}
            name={item.name}
            route={item.route}
            key={item.name}
          />
        ))}
      </MenuList>
    </Drawer>
  )
}
