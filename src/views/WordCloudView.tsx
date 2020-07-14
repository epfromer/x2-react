import { Spinner } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import { fetchAndCache } from './../store'
import { RootState } from './../store/types'
import WordCloud from '../components/WordCloud'

export default function WordCloudView() {
  const dispatch = useDispatch()
  const wordCloudLoading = useSelector(
    (state: RootState) => state.wordCloudLoading
  )
  const wordCloud = useSelector((state: RootState) => state.wordCloud)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )

  function handleClick(word: string) {
    dispatch({ type: 'clearSearch' })
    dispatch({ type: 'setReduxState', key: 'allText', value: word })
    fetchAndCache('emails')
    // history.push('/SearchView')
  }

  const data: any = []
  wordCloud?.forEach((word) =>
    data.push({ name: word.tag, weight: word.weight })
  )

  return (
    <>
      <AppHeader title="Word Cloud" />
      <SafeAreaView style={styles.container}>
        {wordCloudLoading && <Spinner color={themePrimaryColor} />}
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
})
