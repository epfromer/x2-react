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
          <ScrollView>
            <Text style={styles.title}>{email.subject}</Text>
            <Text style={styles.fieldBold}>
              Sent: <Text style={styles.fields}>{email.sent}</Text>
            </Text>
            {email.fromContact ? (
              <Text style={styles.fieldBold}>
                From: <Text style={styles.fields}>{email.from}</Text> (named
                contact: <Text style={styles.fields}>{email.fromContact}</Text>)
              </Text>
            ) : (
              <Text style={styles.fieldBold}>
                From: <Text style={styles.fields}>{email.from}</Text>
              </Text>
            )}
            {email.toContact ? (
              <Text style={styles.fieldBold}>
                To: <Text style={styles.fields}>{email.to}</Text> (named
                contact: <Text style={styles.fields}>{email.toContact}</Text>)
              </Text>
            ) : (
              <Text style={styles.fieldBold}>
                To: <Text style={styles.fields}>{email.to}</Text>
              </Text>
            )}
            <Text style={styles.fieldBold}>
              CC: <Text style={styles.fields}>{email.cc}</Text>
            </Text>
            <Text style={styles.fieldBold}>
              BCC: <Text style={styles.fields}>{email.bcc}</Text>
            </Text>
            <Text style={styles.body}>{email.body}</Text>
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
    fontWeight: 'normal',
  },
  fieldBold: {
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
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
