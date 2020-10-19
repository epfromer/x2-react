import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import BarChartIcon from '@material-ui/icons/BarChart'
import CloudIcon from '@material-ui/icons/Cloud'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import PieChart from '@material-ui/icons/PieChart'
import SearchIcon from '@material-ui/icons/Search'
import TimelineIcon from '@material-ui/icons/Timeline'
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt'
import React from 'react'
import NavListItem from './NavListItem'

// https://material-ui.com/components/material-icons/

interface Props {
  open: boolean
  setOpen: (s: boolean) => void
}

export default function AppDrawer({ open, setOpen }: Props) {
  const mainListItems = [
    { icon: <HomeIcon />, name: 'x2 Home', route: '/' },
    { icon: <SearchIcon />, name: 'Search', route: '/SearchView' },
  ]

  const secondaryListItems = [
    { icon: <AutorenewIcon />, name: 'Chord', route: '/ChordView' },
    { icon: <CloudIcon />, name: 'Word Cloud', route: '/WordCloudView' },
    {
      icon: <DeviceHubIcon />,
      name: 'Network Graph',
      route: '/NetworkGraphView',
    },
    {
      icon: <TimelineIcon />,
      name: 'Volume Timeline',
      route: '/VolumeTimelineView',
    },
    { icon: <ViewQuiltIcon />, name: 'Tree Map', route: '/TreeMapView' },
    {
      icon: <TimelineIcon />,
      name: 'Event Timeline',
      route: '/EventTimelineView',
    },
    { icon: <BarChartIcon />, name: 'Bar', route: '/BarView' },
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
