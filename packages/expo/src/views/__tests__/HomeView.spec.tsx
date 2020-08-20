import { renderComp } from '../../setupTests'
import React from 'react'
import HomeView from '../HomeView'

test('HomeView', () => {
  const { getByText } = renderComp(<HomeView navigation={{}} />)
  const button = getByText(/Pie chart/i)
  expect(button).not.toBeNull()
})
