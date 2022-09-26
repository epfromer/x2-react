import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { renderComp } from '../../setupTests'
import PieView from '../PieView'

test('renders', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<PieView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
