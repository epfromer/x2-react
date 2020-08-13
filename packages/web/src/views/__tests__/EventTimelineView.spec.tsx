import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import EventTimelineView from '../EventTimelineView'

test('toggle vertical', async () => {
  const { getByTestId } = renderComp(<EventTimelineView />)
  const button = getByTestId('toggle-vertical')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})

test('handleClick', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<EventTimelineView />, {}, history)
  const button = getByText(/handleClick/i)
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
