import React from 'react'
import { ScrollView } from 'react-native'
import AppHeader from '../components/AppHeader'
// import BarHighcharts from '../components/Highcharts/BarHighcharts'

export default function BarView() {
  return (
    <>
      <AppHeader title="Bar" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <BarHighcharts /> */}
      </ScrollView>
    </>
  )
}
