import React from 'react'
import { renderComp } from '../../setupTests'
import RouteSwitch from '../RouteSwitch'

test('renders', () => {
  const { getByText } = renderComp(<RouteSwitch />)
  const card = getByText('Volume Timeline')
  expect(card).toBeInTheDocument()
})
