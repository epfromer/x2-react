import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { renderComp } from '../../../setupTests'
import AppDrawer from '../AppDrawer'

test('renders', async () => {
  const setOpen = jest.fn()
  const history = createMemoryHistory()
  const { getByText } = renderComp(
    <AppDrawer open={true} setOpen={setOpen} />,
    history
  )
  const button = getByText(/Word Cloud/i)
  await fireEvent.click(button)
  expect(history.location.pathname).toMatch('/WordCloudView')
})
