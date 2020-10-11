import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import SignInView from '../SignInView'

test('SignInView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<SignInView />, history)
  await fireEvent.press(getByTestId('set-username'))
  await fireEvent.press(getByTestId('set-password'))
  await fireEvent.press(getByTestId('authenticate'))
  expect(history.location.pathname).toMatch('/')
})
