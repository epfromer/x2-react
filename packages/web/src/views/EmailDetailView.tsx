import {
  Email,
  getAllText,
  getBody,
  getEmailById,
  getFrom,
  getSubject,
  getTo,
  store,
  x2Server,
} from '@klonzo/common'
import { gql, request } from 'graphql-request'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'
import EmailCardActions from '../components/emaillist/EmailCardActions'
import { makeStyles } from '@mui/styles'
import { Card, CardContent, Typography } from '@mui/material'

const useStyles = makeStyles({
  root: { width: '100%' },
  paper: { width: '100%', marginBottom: 2 },
  title: { fontSize: 27 },
})

export default function EmailDetailView() {
  const classes = useStyles()
  const { id } = useParams() as any
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<Email | null>(null)
  const cachedEmail = getEmailById(store, id)
  const allText = useSelector(getAllText)
  const to = useSelector(getTo)
  const from = useSelector(getFrom)
  const subject = useSelector(getSubject)
  const body = useSelector(getBody)

  const highlightedTerms: Array<string> = []
  if (allText) highlightedTerms.push(allText)
  if (to) highlightedTerms.push(to)
  if (from) highlightedTerms.push(from)
  if (subject) highlightedTerms.push(subject)
  if (body) highlightedTerms.push(body)

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
    highlightedTerms.forEach((term) => {
      s = s.replace(
        new RegExp(`(${term})`, 'gi'),
        `<span style="background-color:yellow; color:black">$1</span>`
      )
    })
    return s
  }

  function displayText(str: string, className: string | undefined = undefined) {
    return (
      <Typography variant="body1" className={className} component="p">
        <span dangerouslySetInnerHTML={{ __html: highlight(str) }} />
      </Typography>
    )
  }

  const fromStr = () => {
    let s = email?.from
    if (email?.fromCustodian) s += ` (custodian: ${email.fromCustodian})`
    return s
  }

  const toStr = () => {
    let s = email?.to
    if (email?.toCustodians?.length)
      s += ` (custodians: ${email.toCustodians.join(', ')})`
    return s
  }

  return (
    <Card className={classes.root} data-testid="emailcard">
      {loading && <LoadingIndicator />}
      {email && (
        <>
          <EmailCardActions id={id} />
          <CardContent>
            {displayText(email.subject, classes.title)}
            {displayText(`Sent: ${new Date(+email.sent).toUTCString()}`)}
            {/* // todo same for expo */}
            {displayText(`From: ${fromStr()}`)}
            {displayText(`To: ${toStr()}`)}
            {displayText(`CC: ${email.cc}`)}
            {displayText(`BCC: ${email.bcc}`)}
            {displayText(email.body?.replace(/\n/g, '<br />'))}
          </CardContent>
          <EmailCardActions id={id} />
        </>
      )}
      <button
        hidden
        onClick={() => displayText('foo foobar bar')}
        data-testid="handle-click"
      ></button>
    </Card>
  )
}
