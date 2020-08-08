import React from 'react'
import { renderComp } from '../../../setupTests'
import AppFooter from '../AppFooter'

test('renders', async () => {
  const { getByText } = renderComp(<AppFooter />)
  let txt = getByText(/Klonzo \xA9 2020/)
  expect(txt).toBeInTheDocument()
})
