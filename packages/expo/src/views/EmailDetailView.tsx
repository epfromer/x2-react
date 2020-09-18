import {
  Email,
  getEmailById,
  getEmailIndex,
  getNextEmailId,
  getPreviousEmailId,
  selectAllText,
  selectBody,
  selectDarkMode,
  selectEmail,
  selectFrom,
  selectSubject,
  selectTo,
} from '@klonzo/common'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import Highlighter from 'react-native-highlight-words'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'

interface Props {
  route: any
  navigation: any
}
export default function EmailDetailView({ route, navigation }: Props) {
  const darkMode = useSelector(selectDarkMode)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<Email | null>(null)
  const cachedEmail = getEmailById(route.params.id)
  const allText = useSelector(selectAllText)
  const to = useSelector(selectTo)
  const from = useSelector(selectFrom)
  const subject = useSelector(selectSubject)
  const body = useSelector(selectBody)
  const totalEmails = useSelector(selectEmail).length
  const emailIndex = getEmailIndex(route.params.id)
  const previousEmailId = getPreviousEmailId(route.params.id)
  const nextEmailId = getNextEmailId(route.params.id)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    emailHeader: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: {
      margin: 10,
    },
    center: {
      flex: 1,
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    text: {
      color: darkMode ? 'white' : 'black',
    },
    title: {
      fontSize: 20,
      paddingLeft: 10,
      color: darkMode ? 'white' : 'black',
    },
    fields: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'normal',
      color: darkMode ? 'white' : 'black',
    },
    fieldBold: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    },
    body: {
      fontSize: 15,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      color: darkMode ? 'white' : 'black',
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

  const highlightedTerms: Array<string> = []
  if (allText) highlightedTerms.push(allText as string)
  if (to) highlightedTerms.push(to as string)
  if (from) highlightedTerms.push(from as string)
  if (subject) highlightedTerms.push(subject as string)
  if (body) highlightedTerms.push(body as string)

  function doFetch() {
    setLoading(true)
    const server = process.env.REACT_APP_X2_SERVER
    const url = `${server}/email/${route.params.id}`
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
    return (
      <Highlighter
        highlightStyle={{ backgroundColor: 'yellow' } as any}
        searchWords={highlightedTerms}
        textToHighlight={str}
      />
    )
  }

  function EmailHeader() {
    return (
      <View style={styles.emailHeader}>
        <Button
          buttonStyle={styles.button}
          disabled={!previousEmailId}
          icon={<Icon name="arrow-back" />}
          onPress={() => {
            previousEmailId &&
              navigation.navigate('EmailDetail', { id: previousEmailId })
          }}
        />
        <Text style={styles.text}>
          {totalEmails ? `${emailIndex} of ${totalEmails}` : ''}
        </Text>
        <Button
          buttonStyle={styles.button}
          disabled={!nextEmailId}
          icon={<Icon name="arrow-forward" />}
          onPress={() => {
            nextEmailId &&
              navigation.navigate('EmailDetail', { id: nextEmailId })
          }}
        />
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading} textContent={'Loading...'} />
        {email && (
          <View>
            <EmailHeader />
            <ScrollView>
              <Text style={styles.title}>{highlight(email.subject)}</Text>
              <Text style={styles.fieldBold}>
                Sent: <Text style={styles.fields}>{email.sent}</Text>
              </Text>
              {email.fromCustodian ? (
                <Text style={styles.fieldBold}>
                  From:{' '}
                  <Text style={styles.fields}>{highlight(email.from)}</Text>{' '}
                  (custodian:{' '}
                  <Text style={styles.fields}>{email.fromCustodian}</Text>)
                </Text>
              ) : (
                <Text style={styles.fieldBold}>
                  From:{' '}
                  <Text style={styles.fields}>{highlight(email.from)}</Text>
                </Text>
              )}
              {email.toCustodians ? (
                <Text style={styles.fieldBold}>
                  To: <Text style={styles.fields}>{highlight(email.to)}</Text>{' '}
                  (custodian:{' '}
                  <Text style={styles.fields}>{email.toCustodians}</Text>)
                </Text>
              ) : (
                <Text style={styles.fieldBold}>
                  To: <Text style={styles.fields}>{highlight(email.to)}</Text>
                </Text>
              )}
              <Text style={styles.fieldBold}>
                CC: <Text style={styles.fields}>{highlight(email.cc)}</Text>
              </Text>
              <Text style={styles.fieldBold}>
                BCC: <Text style={styles.fields}>{highlight(email.bcc)}</Text>
              </Text>
              <Text style={styles.body}>{highlight(email.body)}</Text>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </>
  )
}
