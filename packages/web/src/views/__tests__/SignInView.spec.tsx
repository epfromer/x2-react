import { fireEvent } from '@testing-library/react'
import React from 'react'
import { renderComp } from '../../setupTests'
import SignInView from '../SignInView'

test('renders', async () => {
  const { getByTestId } = renderComp(<SignInView />)
  let button = getByTestId('clear-password')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
