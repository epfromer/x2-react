import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-native'
import AppSettingsView from '../views/AppSettingsView'
import BarView from '../views/BarView'
import EmailDetailView from '../views/EmailDetailView'
import HomeView from '../views/HomeView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import SearchHistoryView from '../views/SearchHistoryView'
import SearchView from '../views/SearchView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'

// https://reactrouter.com/native/guides/quick-start

export const routeNames = {
  '/AppSettingsView': 'Settings',
  '/SearchView': 'Search',
  '/PieView': 'Pie',
  '/BarView': 'Bar',
  '/NetworkGraphView': 'Network Graph',
  '/TreeMapView': 'Tree Map',
  '/VolumeTimelineView': 'Volume Timeline',
  '/EmailDetailView': 'Email Detail',
  '/': 'Home',
}

export default function AppRouting() {
  return (
    <Routes>
      <Route path="/AppSettingsView" element={<AppSettingsView />} />
      <Route path="/SearchHistoryView" element={<SearchHistoryView />} />
      <Route path="/SearchView" element={<SearchView />} />
      <Route path="/PieView" element={<PieView />} />
      <Route path="/BarView" element={<BarView />} />
      <Route path="/NetworkGraphView" element={<NetworkGraphView />} />
      <Route path="/TreeMapView" element={<TreeMapView />} />
      <Route path="/VolumeTimelineView" element={<VolumeTimelineView />} />
      <Route path="/EmailDetailView/:id" element={<EmailDetailView />} />
      <Route path="/HomeView" element={<HomeView />} />
    </Routes>
  )
}
