import { Body, Card, CardItem } from 'native-base'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import AppHeader from '../components/AppHeader'

export default function SearchView() {
  return (
    <>
      <AppHeader title="Search" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Card>
          <CardItem header>
            <Text>SearchView</Text>
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
