import { fireEvent } from '@testing-library/react'
import { renderComp } from '../../setupTests'
import SearchHistoryView from '../SearchHistoryView'

test('renders', async () => {
  const { getByTestId } = renderComp(<SearchHistoryView />)
  let button = getByTestId('clear-history')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
