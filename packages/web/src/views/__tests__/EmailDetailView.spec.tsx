import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import EmailDetailView from '../EmailDetailView'

test('displayText', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<EmailDetailView />, {}, history)
  const button = getByText(/displayText/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/')
})

test('highlighted terms', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(
    <EmailDetailView />,
    {
      allText: 'foo',
      to: 'foo',
      from: 'foo',
      subject: 'foo',
      body: 'foo',
    },
    history
  )
  const button = getByText(/displayText/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/')
})
