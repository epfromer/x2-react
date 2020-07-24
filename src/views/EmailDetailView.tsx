import { Spinner } from 'native-base'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import { getEmailById } from '../store'
import { Email, RootState } from '../store/types'
import { Body, Card, CardItem } from 'native-base'

interface Props {
  route: any
  navigation: any
}
export default function EmailDetailView({ route, navigation }: Props) {
  const [loading, setLoading] = useState(false)
  const themePrimaryColor = useSelector(
    (state: RootState) => state.themePrimaryColor
  )
  const [email, setEmail] = useState<Email | null>(null)
  const cachedEmail = useSelector((state: RootState) =>
    getEmailById(state, route.params.id)
  )
  const allText = useSelector((state: RootState) => state.allText)
  const to = useSelector((state: RootState) => state.to)
  const from = useSelector((state: RootState) => state.from)
  const subject = useSelector((state: RootState) => state.subject)
  const body = useSelector((state: RootState) => state.body)

  const highlightedTerms: Array<string> = []
  if (allText) highlightedTerms.push(allText)
  if (to) highlightedTerms.push(to)
  if (from) highlightedTerms.push(from)
  if (subject) highlightedTerms.push(subject)
  if (body) highlightedTerms.push(body)

  function doFetch() {
    setLoading(true)
    const url = `${process.env.REACT_APP_EMAIL_SERVER}/email/${route.params.id}`
    console.log(url)
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setEmail(json))
      .catch((err) => console.error('fetch error', err))
      .then(() => setLoading(false))
  }

  useEffect(() => {
    cachedEmail ? setEmail(cachedEmail) : doFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedEmail])

  function highlight(str: string) {
    let s = str
    if (!s) return ''
    highlightedTerms.forEach((term) => {
      s = s.replace(
        new RegExp(`(${term})`, 'gi'),
        `<span style="background-color:yellow; color:black">$1</span>`
      )
    })
    return s
  }

  function displayText(str: string, className: any | undefined = undefined) {
    return <Text style={className}>{str}</Text>
  }

  return (
    <>
      <AppHeader title="Email Detail" />
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={styles.loading}>
            <Spinner color={themePrimaryColor} />
          </View>
        )}
        {email && (
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {displayText(email.subject, styles.title)}
            {displayText(`Sent: ${email.sent}`, styles.fields)}
            {displayText(
              email.fromContact
                ? `From: ${email.from} (named contact: ${email.fromContact})`
                : `From: ${email.from}`,
              styles.fields
            )}
            {displayText(
              email.toContact
                ? `To: ${email.to} (named contact: ${email.toContact})`
                : `To: ${email.to}`,
              styles.fields
            )}
            {displayText(`CC: ${email.cc}`, styles.fields)}
            {displayText(`BCC: ${email.bcc}`, styles.fields)}
            {displayText(email.body, styles.body)}
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    padding: 10,
  },
  fields: {
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  body: {
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
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
