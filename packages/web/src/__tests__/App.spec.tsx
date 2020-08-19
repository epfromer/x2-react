import React from 'react'
import { renderComp } from '../setupTests'
import App from '../App'

test('renders', () => {
  const { getByText } = renderComp(<App />)
  const card = getByText('Volume Timeline')
  expect(card).toBeInTheDocument()
})
