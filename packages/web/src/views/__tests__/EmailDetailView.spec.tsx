import React from 'react'
import { renderComp } from '../../setupTests'
import EmailDetailView from '../EmailDetailView'

test('renders', () => {
  const { getByTestId } = renderComp(<EmailDetailView />)
  const table = getByTestId('emailcard')
  expect(table).toBeInTheDocument()
})
