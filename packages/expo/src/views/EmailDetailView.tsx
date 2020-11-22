import {
  Email,
  getEmailById,
  getEmailIndex,
  getNextEmailId,
  getPreviousEmailId,
  getAllText,
  getBody,
  getEmail,
  getFrom,
  getSubject,
  getTo,
  store,
  x2Server,
} from '@klonzo/common'
import { gql, request } from 'graphql-request'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, ThemeContext } from 'react-native-elements'
import Highlighter from 'react-native-highlight-words'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-native'
import { textColor } from '../utils/appThemes'

export default function EmailDetailView() {
  const history = useHistory()
  let { id } = useParams<{ id: string }>()
  if (process.env.NODE_ENV === 'test')
    id = 'f3281cc4-90a9-4dcb-86bd-d705fc847985'
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<Email | null>(null)
  const cachedEmail = getEmailById(store, id)
  const allText = useSelector(getAllText)
  const to = useSelector(getTo)
  const from = useSelector(getFrom)
  const subject = useSelector(getSubject)
  const body = useSelector(getBody)
  const cachedEmails = useSelector(getEmail)
  const totalCachedEmails = cachedEmails ? cachedEmails.length : 0
  const emailIndex = getEmailIndex(store, id)
  const previousEmailId = getPreviousEmailId(store, id)
  const nextEmailId = getNextEmailId(store, id)
  const { theme }: any = useContext(ThemeContext)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    emailHeader: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonText: {
      color: textColor(theme),
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
      color: theme.colors.black,
    },
    title: {
      fontSize: 20,
      paddingLeft: 10,
      color: theme.colors.black,
    },
    fields: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'normal',
      color: theme.colors.black,
    },
    fieldBold: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'bold',
      color: theme.colors.black,
    },
    body: {
      fontSize: 15,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      color: theme.colors.black,
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

  useEffect(() => {
    let isSubscribed = true
    if (cachedEmail) {
      setEmail(cachedEmail)
    } else {
      const server = process.env.REACT_APP_X2_SERVER
        ? process.env.REACT_APP_X2_SERVER
        : x2Server
      setLoading(true)
      const query = gql`
        query getEmail($id: ID) {
          getEmail(id: $id) {
            emails {
              id
              sent
              sentShort
              from
              fromCustodian
              to
              toCustodians
              cc
              bcc
              subject
              body
            }
            total
          }
        }
      `
      request(`${server}/graphql/`, query, { id })
        .then((data) => {
          // prevents update if component destroyed before request/fetch completes
          if (isSubscribed) {
            setEmail(data.getEmail.emails[0])
            setLoading(false)
          }
        })
        .catch((e) => console.error(e))
    }
    return () => {
      // prevents update if component destroyed before request/fetch completes
      isSubscribed = false
    }
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

  const EmailHeader = () => (
    <View style={styles.emailHeader}>
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        disabled={!previousEmailId}
        testID="previous-email"
        icon={<Icon name="arrow-back" color={textColor(theme)} />}
        onPress={() => {
          previousEmailId && history.push(`/EmailDetailView/${previousEmailId}`)
        }}
      />
      <Text style={styles.text}>
        {totalCachedEmails ? `${emailIndex} of ${totalCachedEmails}` : ''}
      </Text>
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        disabled={!nextEmailId}
        testID="next-email"
        icon={<Icon name="arrow-forward" color={textColor(theme)} />}
        onPress={() => {
          nextEmailId && history.push(`/EmailDetailView/${nextEmailId}`)
        }}
      />
    </View>
  )

  return (
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
            {email.fromCustodian && (
              <Text style={styles.fieldBold}>
                From: <Text style={styles.fields}>{highlight(email.from)}</Text>{' '}
                (custodian:{' '}
                <Text style={styles.fields}>{email.fromCustodian}</Text>)
              </Text>
            )}
            {!email.fromCustodian && (
              <Text style={styles.fieldBold}>
                From: <Text style={styles.fields}>{highlight(email.from)}</Text>
              </Text>
            )}
            {email.toCustodians && (
              <Text style={styles.fieldBold}>
                To: <Text style={styles.fields}>{highlight(email.to)}</Text>{' '}
                (custodian:{' '}
                <Text style={styles.fields}>{email.toCustodians}</Text>)
              </Text>
            )}
            {!email.toCustodians && (
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
  )
}
