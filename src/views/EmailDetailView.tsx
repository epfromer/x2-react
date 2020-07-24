import React, { useState } from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader'
import { getEmailById } from '../store'
import { Email, RootState } from '../store/types'

interface Props {
  route: any
  navigation: any
}
export default function EmailDetailView({ route, navigation }: Props) {
  const [loading, setLoading] = useState(false)
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

  async function doFetch() {
    setLoading(true)
    const url = `${process.env.REACT_APP_EMAIL_SERVER}/email/${id}`
    console.log(url)
    const resp = await fetch(url)
    resp
      .json()
      .then((resp) => setEmail(resp))
      .catch((err) => console.error('fetch error', err))
      .then(() => setLoading(false))
  }

  return (
    <>
      <AppHeader title="Email Detail" />
      <Text>{JSON.stringify(cachedEmail)}</Text>
    </>
  )
}
