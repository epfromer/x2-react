import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppSettingsView from '../views/AppSettingsView'
import BarView from '../views/BarView'
import ChordView from '../../packages/web/src/views/ChordView'
import EmailDetailView from '../../packages/web/src/views/EmailDetailView'
import EventTimelineView from '../../packages/web/src/views/EventTimelineView'
import HomeView from '../../packages/web/src/views/HomeView'
import NetworkGraphView from '../../packages/web/src/views/NetworkGraphView'
import PieView from '../../packages/web/src/views/PieView'
import SearchHistoryView from '../../packages/web/src/views/SearchHistoryView'
import SearchView from '../../packages/web/src/views/SearchView'
import TreeMapView from '../../packages/web/src/views/TreeMapView'
import VolumeTimelineView from '../../packages/web/src/views/VolumeTimelineView'
import WordCloudView from '../../packages/web/src/views/WordCloudView'

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
