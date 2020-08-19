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

test('toFoo', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<EventTimelineView />, history)
  const button = getByTestId('to-foo')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/')
})

test('fromFoo', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<EventTimelineView />, history)
  const button = getByTestId('from-foo')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/')
})

test('allTextFoo', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<EventTimelineView />, history)
  const button = getByTestId('all-text-foo')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/')
})
