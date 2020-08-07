import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import WordCloud from '../components/WordCloud'
import { clearSearch, fetchAndCache, setReduxState } from './../store/actions'
import { RootState } from './../store/types'

interface Props {
  route: any
  navigation: any
}
export default function WordCloudView({ navigation }: Props) {
  const wordCloudLoading = useSelector(
    (state: RootState) => state.wordCloudLoading
  )
  const wordCloud = useSelector((state: RootState) => state.wordCloud)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  function handleClick(word: string) {
    clearSearch()
    setReduxState('allText', word)
    fetchAndCache('emails')
    navigation.navigate('SearchView')
  }

  const data: any = []
  wordCloud?.forEach((word) =>
    data.push({ name: word.tag, weight: word.weight })
  )

  return (
    <>
      <AppHeader title="Word Cloud" />
      <SafeAreaView style={styles.container}>
        {wordCloudLoading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
        {wordCloud && (
          <WordCloud
            title="Enron Project Names"
            words={data}
            handleClick={handleClick}
          />
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
