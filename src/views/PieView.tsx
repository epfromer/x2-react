import React from 'react'
import AppHeader from '../components/AppHeader'
import PieECharts from '../components/ECharts/PieECharts'

export default function PieView() {
  return (
    <>
      <AppHeader title="Pie" />
      <PieECharts />
    </>
  )
}
