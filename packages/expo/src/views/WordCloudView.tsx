import {
  clearSearch,
  fetchAndCache,
  RootState,
  setReduxState,
} from '@klonzo/common'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import WordCloud from '../components/WordCloud'

interface Props {
  route: any
  navigation: any
}
export default function WordCloudView({ navigation }: Props) {
  const wordCloudLoading = useSelector(
    (state: RootState) => state.wordCloudLoading
  )
  const wordCloud = useSelector((state: RootState) => state.wordCloud)

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
      <SafeAreaView style={styles.container}>
        <Spinner visible={wordCloudLoading} textContent={'Loading...'} />
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
