import { Spinner } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import WordCloudECharts from '../components/ECharts/WordCloudECharts'
import { fetchAndCache } from './../store'
import { RootState } from './../store/types'

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

  return (
    <>
      <AppHeader title="Word Cloud" />
      <SafeAreaView style={styles.container}>
        {wordCloudLoading && <Spinner color={themePrimaryColor} />}
        <WordCloudECharts
          title="Enron Project Names"
          words={[]}
          handleClick={handleClick}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
