import { fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { renderComp } from '../../../setupTests'
import AppToolbar from '../AppToolbar'

test('renders', async () => {
  const setDrawerOpen = jest.fn()
  const history = createMemoryHistory()
  const { getByTestId } = renderComp(
    <AppToolbar setDrawerOpen={setDrawerOpen} drawerOpen={true} />,
    history
  )
  const openDrawer = getByTestId('open-drawer')
  await fireEvent.click(openDrawer)
  expect(openDrawer).toBeInTheDocument()
})
