import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderComp } from '../../setupTests'
import TreeMapView from '../../../packages/web/src/views/TreeMapView'

beforeAll(() => jest.useFakeTimers())
afterAll(() => jest.useRealTimers())

test('renders', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<TreeMapView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
