import { Body, Card, CardItem, Container, Content, Header } from 'native-base'
import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'

// https://docs.nativebase.io/Components.html#card-headfoot-headref

export default function DashboardView() {
  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <CardItem header>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg',
              }}
              style={{ height: 200, width: null, flex: 1 } as any}
            />
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
