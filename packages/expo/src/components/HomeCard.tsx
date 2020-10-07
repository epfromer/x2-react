import { selectDarkMode } from '@klonzo/common'
import React, { useState, useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import { Button, Icon, Input } from 'react-native-elements'
import { ThemeContext } from 'react-native-elements'

// https://docs.nativebase.io/Components.html#card-headfoot-headref

/*
  LIGHT
  Object {
  "Button": Object {
    "buttonStyle": Object {
      "backgroundColor": "purple",
    },
    "titleStyle": Object {
      "backgroundColor": "red",
      "color": "black",
    },
  },
  "Header": Object {
    "containerStyle": Object {
      "backgroundColor": "orange",
    },
  },
  "View": Object {
    "containerStyle": Object {
      "backgroundColor": "orange",
    },
  },
  "colors": Object {
    "black": "#242424",
    "disabled": "hsl(208, 8%, 90%)",
    "divider": "#bcbbc1",
    "error": "#ff190c",
    "grey0": "#393e42",
    "grey1": "#43484d",
    "grey2": "#5e6977",
    "grey3": "#86939e",
    "grey4": "#bdc6cf",
    "grey5": "#e1e8ee",
    "greyOutline": "#bbb",
    "platform": Object {
      "android": Object {
        "error": "#f44336",
        "grey": "rgba(0, 0, 0, 0.54)",
        "primary": "#2196f3",
        "secondary": "#9C27B0",
        "success": "#4caf50",
        "warning": "#ffeb3b",
      },
      "ios": Object {
        "error": "#ff3b30",
        "grey": "#7d7d7d",
        "primary": "#007aff",
        "searchBg": "#dcdce1",
        "secondary": "#5856d6",
        "success": "#4cd964",
        "warning": "#ffcc00",
      },
    },
    "primary": "#2089dc",
    "searchBg": "#303337",
    "secondary": "#ca71eb",
    "success": "#52c41a",
    "warning": "#faad14",
    "white": "#ffffff",
  },
}


  DARK
  Object {
  "Button": Object {
    "buttonStyle": Object {
      "backgroundColor": "purple",
    },
    "titleStyle": Object {
      "backgroundColor": "red",
      "color": "black",
    },
  },
  "Header": Object {
    "containerStyle": Object {
      "backgroundColor": "orange",
    },
  },
  "colors": Object {
    "black": "#f2f2f2",
    "disabled": "hsl(208, 8%, 90%)",
    "divider": "#84838a",
    "error": "#bf2c24",
    "grey0": "#e1e8ee",
    "grey1": "#bdc6cf",
    "grey2": "#86939e",
    "grey3": "#5e6977",
    "grey4": "#43484d",
    "grey5": "#393e42",
    "greyOutline": "#bbb",
    "platform": Object {
      "android": Object {
        "error": "#bf2c24",
        "grey": "#393e42",
        "primary": "#1b262c",
        "secondary": "#2089dc",
        "success": "#439946",
        "warning": "#cfbe27",
      },
      "ios": Object {
        "error": "#bf2c24",
        "grey": "#ffffff",
        "primary": "#1b262c",
        "searchBg": "#393e42",
        "secondary": "#2089dc",
        "success": "#439946",
        "warning": "#cfbe27",
      },
    },
    "primary": "#439ce0",
    "searchBg": "#303337",
    "secondary": "#aa49eb",
    "success": "#439946",
    "warning": "#cfbe27",
    "white": "#080808",
  },
}
  */

interface Props {
  image: any
  title: string
  description: string
  link: string
}
export default function HomeCard({ image, title, description, link }: Props) {
  const darkMode = useSelector(selectDarkMode)
  const history = useHistory()
  const { theme } = useContext(ThemeContext)
  console.log(theme)

  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      marginLeft: 10,
      marginTop: 10,
      color: darkMode ? 'white' : 'black',
    },
    text: {
      marginLeft: 10,
      marginBottom: 10,
      color: darkMode ? 'white' : 'black',
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

  return (
    <TouchableOpacity onPress={() => history.push(link)}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{description}</Text>
        <Button title="My Button" />
        <View style={styles.separator} />
      </View>
    </TouchableOpacity>
  )
}
