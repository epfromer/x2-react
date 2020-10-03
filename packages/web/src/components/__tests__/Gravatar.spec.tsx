import React from 'react'
import { renderComp } from '../../setupTests'
import Gravatar from '../Gravatar'

test('renders', async () => {
  const { getByTestId } = renderComp(<Gravatar email="epfromer@gmail.com" />)
  expect(getByTestId('gravatar')).toBeInTheDocument()
})
