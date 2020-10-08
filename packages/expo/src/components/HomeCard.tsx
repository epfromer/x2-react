import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from 'react-native-elements'
import { useHistory } from 'react-router-native'

// https://docs.nativebase.io/Components.html#card-headfoot-headref

interface Props {
  image: any
  title: string
  description: string
  link: string
}
export default function HomeCard({ image, title, description, link }: Props) {
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    title: {
      fontSize: 20,
      marginLeft: 10,
      marginTop: 10,
      color: theme.colors.black,
    },
    text: {
      marginLeft: 10,
      marginBottom: 10,
      color: theme.colors.black,
    },
    image: {
      width: '90%',
      height: 150,
      margin: '5%',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: theme.colors.divider,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  })

  return (
    <TouchableOpacity onPress={() => history.push(link)}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{description}</Text>
        <View style={styles.separator} />
      </View>
    </TouchableOpacity>
  )
}
