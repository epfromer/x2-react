import React from 'react'
import { renderComp } from '../../../setupTests'
import EmailCardActions from '../EmailCardActions'
import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'

test('back-to-list', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(
    <EmailCardActions id="5f12fbcdab4d2f1a58edd10b" />,
    history
  )
  const button = getByTestId('back-to-list')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})

test('previous-email', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(
    <EmailCardActions id="5f12fbcdab4d2f1a58edd10b" />,
    history
  )
  const button = getByTestId('previous-email')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch(
    '/EmailDetailView/5f12fbcdab4d2f1a58edd105'
  )
})

test('next-email', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(
    <EmailCardActions id="5f12fbcdab4d2f1a58edd10b" />,
    history
  )
  const button = getByTestId('next-email')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch(
    '/EmailDetailView/4f12fbcdab4d2f1a58edd10b'
  )
})
