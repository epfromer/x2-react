import { Body, Card, CardItem, Container, Content, Header } from 'native-base'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default function DashboardView() {
  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <CardItem header>
            <Text>NativeBase</Text>
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
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
})
