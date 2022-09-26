import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { renderComp } from '../../setupTests'
import TreeMapView from '../TreeMapView'

beforeAll(() => jest.useFakeTimers())
afterAll(() => jest.useRealTimers())

test('renders', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<TreeMapView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
