import { Body, Card, CardItem } from 'native-base'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import AppHeader from '../components/AppHeader'

export default function WordCloudView() {
  return (
    <>
      <AppHeader title="Word Cloud" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Card>
          <CardItem header>
            <Text>WordCloudView</Text>
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
    </>
  )
}
