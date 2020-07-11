import { Body, Card, CardItem } from 'native-base'
import React from 'react'
import { ScrollView, Text } from 'react-native'

export default function EventTimelineView() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Card>
        <CardItem header>
          <Text>EventTimelineView</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>some text</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>GeekyAnts</Text>
        </CardItem>
      </Card>
    </ScrollView>
  )
}
