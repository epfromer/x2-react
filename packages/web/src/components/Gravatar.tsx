import Avatar from '@material-ui/core/Avatar'
import md5 from 'md5'
import querystring from 'query-string'
import React from 'react'

interface Props {
  email?: string
  size?: number
  rating?: string
  def?: string
  protocol?: string
  domain?: string
}

export default function MUIGravatar({
  email,
  size = 50,
  rating = 'g',
  def = 'retro',
  protocol = '//',
  domain = 'www.gravatar.com',
}: Props) {
  const base = `${protocol}${domain}/avatar/`
  const query = querystring.stringify({
    s: size,
    r: rating,
    d: def,
  })

  // Gravatar service currently trims and lowercases all registered emails
  const formattedEmail = ('' + email).trim().toLowerCase()
  let hash = md5(formattedEmail, { encoding: 'binary' })
  const src = `${base}${hash}?${query}`
  return <Avatar src={src} />
}
