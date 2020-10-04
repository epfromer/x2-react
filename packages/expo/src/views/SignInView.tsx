import React from 'react'
import { ScrollView, Text } from 'react-native'

interface Props {
  navigation: any
}
export default function HomeView({ navigation }: Props) {
  return (
    <ScrollView>
      <Text>foo</Text>
    </ScrollView>
  )
}
