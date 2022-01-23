import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppSettingsView from '../views/AppSettingsView'
import BarView from '../views/BarView'
import ChordView from '../views/ChordView'
import EmailDetailView from '../views/EmailDetailView'
import EventTimelineView from '../views/EventTimelineView'
import HomeView from '../views/HomeView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import SearchHistoryView from '../views/SearchHistoryView'
import SearchView from '../views/SearchView'
import TreeMapView from '../views/TreeMapView'
import VolumeTimelineView from '../views/VolumeTimelineView'
import WordCloudView from '../views/WordCloudView'

export default function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/AppSettingsView" element={<AppSettingsView />} />
      <Route path="/SearchHistoryView" element={<SearchHistoryView />} />
      <Route path="/SearchView" element={<SearchView data-testid="switch" />} />
      <Route path="/ChordView" element={<ChordView />} />
      <Route path="/WordCloudView" element={<WordCloudView />} />
      <Route path="/EventTimelineView" element={<EventTimelineView />} />
      <Route path="/PieView" element={<PieView />} />
      <Route path="/BarView" element={<BarView />} />
      <Route path="/NetworkGraphView" element={<NetworkGraphView />} />
      <Route path="/TreeMapView" element={<TreeMapView />} />
      <Route path="/VolumeTimelineView" element={<VolumeTimelineView />} />
      <Route path="/EmailDetailView/:id" element={<EmailDetailView />} />
    </Routes>
  )
}
