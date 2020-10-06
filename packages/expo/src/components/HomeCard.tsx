import { selectDarkMode } from '@klonzo/common'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'

// https://docs.nativebase.io/Components.html#card-headfoot-headref

interface Props {
  image: any
  title: string
  description: string
  link: string
}
export default function HomeCard({ image, title, description, link }: Props) {
  const darkMode = useSelector(selectDarkMode)
  const history = useHistory()
  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      marginLeft: 10,
      marginTop: 10,
      color: darkMode ? 'white' : 'black',
    },
    text: {
      color: darkMode ? 'white' : 'black',
      marginLeft: 10,
      marginBottom: 10,
    },
    image: {
      width: '90%',
      height: 150,
      margin: '5%',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  })

  const Separator = () => <View style={styles.separator} />
  return (
    <TouchableOpacity onPress={() => history.push(link)}>
      <Text style={styles.title}>{title}</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{description}</Text>
      <Separator />
    </TouchableOpacity>
  )
}
