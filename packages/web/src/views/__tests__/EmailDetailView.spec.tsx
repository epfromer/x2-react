import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import EmailDetailView from '../EmailDetailView'

test('displayText', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<EmailDetailView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/')
})

test('highlighted terms', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<EmailDetailView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/')
})
