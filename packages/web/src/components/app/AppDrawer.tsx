import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Email from '@material-ui/icons/Email'
import PieChart from '@material-ui/icons/PieChart'
import React from 'react'
import NavListItem from './NavListItem'

// https://material-ui.com/components/material-icons/

interface Props {
  open: boolean
  setOpen: (s: boolean) => void
}

export default function AppDrawer({ open, setOpen }: Props) {
  const mainListItems = [
    { icon: <DashboardIcon />, name: 'x2 Home', route: '/' },
    { icon: <Email />, name: 'Search', route: '/SearchView' },
  ]

  const secondaryListItems = [
    { icon: <PieChart />, name: 'Chord', route: '/ChordView' },
    { icon: <PieChart />, name: 'Word Cloud', route: '/WordCloudView' },
    { icon: <PieChart />, name: 'Network Graph', route: '/NetworkGraphView' },
    {
      icon: <PieChart />,
      name: 'Volume Timeline',
      route: '/VolumeTimelineView',
    },
    { icon: <PieChart />, name: 'Tree Map', route: '/TreeMapView' },
    { icon: <PieChart />, name: 'Event Timeline', route: '/EventTimelineView' },
    { icon: <PieChart />, name: 'Bar', route: '/BarView' },
    { icon: <PieChart />, name: 'Polar', route: '/PolarView' },
    { icon: <PieChart />, name: 'Pie', route: '/PieView' },
  ]

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(false)}
    >
      <List>
        {mainListItems.map((item) => (
          <NavListItem
            icon={item.icon}
            name={item.name}
            route={item.route}
            key={item.name}
          />
        ))}
      </List>
      <Divider />
      <List>
        {secondaryListItems.map((item) => (
          <NavListItem
            icon={item.icon}
            name={item.name}
            route={item.route}
            key={item.name}
          />
        ))}
      </List>
    </Drawer>
  )
}
