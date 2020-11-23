import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { Route } from 'react-router-dom'
import LoadingIndicator from '../components/LoadingIndicator'

export default function ProtectedRoute({ component, ...args }: any) {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <LoadingIndicator />,
      })}
      {...args}
    />
  )
}
