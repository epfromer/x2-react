import React from 'react'
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Card } from 'react-native-elements'
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
      marginBottom: 10,
    },
  })

  return (
    <TouchableOpacity onPress={() => navigation.navigate(link)}>
      <Card title={title} image={image}>
        <Text style={styles.text}>{description}</Text>
      </Card>
    </TouchableOpacity>
  )
}
