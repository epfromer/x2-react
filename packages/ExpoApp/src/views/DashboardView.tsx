import { PIE } from '@x2react/shared'
import React from 'react'
import { ImageSourcePropType, ScrollView } from 'react-native'
import AppHeader from '../components/AppHeader'
import DashboardCard from '../components/DashboardCard'

interface Props {
  navigation: any
}
export default function DashboardView({ navigation }: Props) {
  return (
    <>
      <AppHeader title="Dashboard" />
      <ScrollView>
        <DashboardCard
          navigation={navigation}
          image={PIE as ImageSourcePropType}
          title="Pie"
          description="Pie chart of email volume of Enron key contacts."
          link="PieView"
        />
      </ScrollView>
    </>
  )
}
