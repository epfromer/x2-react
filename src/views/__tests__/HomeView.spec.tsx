import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { renderComp } from '../../setupTests'
import HomeView from '../HomeView'

test('HomeView', async () => {
  const history = createMemoryHistory()
  const { getByText } = renderComp(<HomeView />, history)
  const button = getByText(/Enron email per day/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/VolumeTimelineView')
})
