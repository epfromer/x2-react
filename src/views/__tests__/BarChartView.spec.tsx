import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { renderComp } from '../../setupTests'
import BarView from '../BarView'

test('handleClick', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(<BarView />, history)
  const button = getByTestId('handle-click')
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/SearchView')
})
