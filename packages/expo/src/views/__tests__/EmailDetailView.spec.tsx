import { fireEvent } from '@testing-library/react-native'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import EmailDetailView from '../EmailDetailView'

test('EmailDetailView', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<EmailDetailView />, history)
  await fireEvent.press(getByTestId('previous-email'))
  expect(history.location.pathname).toMatch(
    '/EmailDetailView/692fbb3b-1a4d-4c5b-b8c2-42034586cc56'
  )
  await fireEvent.press(getByTestId('next-email'))
  expect(history.location.pathname).toMatch(
    '/EmailDetailView/5cac6ca4-01e7-4de5-a1d4-806b860e104d'
  )
})
