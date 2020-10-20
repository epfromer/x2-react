import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { Route } from 'react-router-dom'
import Loading from '../components/Loading'

export default function ProtectedRoute({ component, ...args }: any) {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
      })}
      {...args}
    />
  )
}
