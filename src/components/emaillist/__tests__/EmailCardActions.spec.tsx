import React from 'react'
import { renderComp } from '../../../setupTests'
import EmailCardActions from '../EmailCardActions'
import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'

test('back-to-list', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(
    <EmailCardActions id="f3281cc4-90a9-4dcb-86bd-d705fc847985" />,
    history
  )
  const button = getByTestId('back-to-list')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})

test('previous-email', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(
    <EmailCardActions id="f3281cc4-90a9-4dcb-86bd-d705fc847985" />,
    history
  )
  const button = getByTestId('previous-email')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch(
    '/EmailDetailView/692fbb3b-1a4d-4c5b-b8c2-42034586cc56'
  )
})

test('next-email', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(
    <EmailCardActions id="f3281cc4-90a9-4dcb-86bd-d705fc847985" />,
    history
  )
  const button = getByTestId('next-email')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch(
    '/EmailDetailView/5cac6ca4-01e7-4de5-a1d4-806b860e104d'
  )
})
