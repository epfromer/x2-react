import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import EmailCardActions from '../components/emaillist/EmailCardActions'
import { getEmailById } from '../store/selectors'
import { Email, RootState } from './../store/types'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  title: { fontSize: 27 },
}))

export default function EmailDetailView() {
  const classes = useStyles()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<Email | null>(null)
  const cachedEmail = useSelector((state: RootState) => getEmailById(state, id))
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
    const url = `${process.env.REACT_APP_EMAIL_SERVER}/email/${id}`
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

  function displayText(str: string, className: string | undefined = undefined) {
    return (
      <Typography variant="body1" className={className} component="p">
        <span dangerouslySetInnerHTML={{ __html: highlight(str) }} />
      </Typography>
    )
  }

  return (
    <Card className={classes.root} data-testid="emailcard">
      {loading && <LinearProgress />}
      {email && (
        <>
          <EmailCardActions id={id} />
          <CardContent>
            {displayText(email.subject, classes.title)}
            {displayText(`Sent: ${email.sent}`)}
            {displayText(
              `From: ${email.from}
          ${
            email.fromContact
              ? ' (named contact: ' + email.fromContact + ')'
              : ''
          }`
            )}
            {displayText(
              `To: ${email.to}
          ${email.toContact ? ' (named contact: ' + email.toContact + ')' : ''}`
            )}
            {displayText(`CC: ${email.cc}`)}
            {displayText(`BCC: ${email.bcc}`)}
            {displayText(email.body?.replace(/\n/g, '<br />'))}
          </CardContent>
          <EmailCardActions id={id} />
        </>
      )}
    </Card>
  )
}
