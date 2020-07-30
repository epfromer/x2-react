import { Body, Card, CardItem } from 'native-base'
import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/types'

// https://docs.nativebase.io/Components.html#card-headfoot-headref

interface Props {
  navigation: any
  image: ImageSourcePropType
  title: string
  description: string
  link: string
}
export default function DashboardCard({
  navigation,
  image,
  title,
  description,
  link,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      color: darkMode ? 'white' : 'black',
    },
    card: {
      backgroundColor: darkMode ? 'black' : 'white',
    },
    text: {
      color: darkMode ? 'white' : 'black',
    },
  })

  return (
    <Card>
      <CardItem
        header
        button
        style={styles.card}
        onPress={() => navigation.navigate(link)}
      >
        <Text style={styles.title}>{title}</Text>
      </CardItem>
      <CardItem cardBody button onPress={() => navigation.navigate(link)}>
        <Image
          source={image}
          style={{ height: 200, width: null, flex: 1 } as any}
        />
      </CardItem>
      <CardItem
        button
        style={styles.card}
        onPress={() => navigation.navigate(link)}
      >
        <Body>
          <Text style={styles.text}>{description}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}
