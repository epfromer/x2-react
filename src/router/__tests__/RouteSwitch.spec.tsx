import { renderComp } from '../../setupTests'
import AppRouting from '../AppRouting'

test('renders', () => {
  const { getByText } = renderComp(<AppRouting />)
  const card = getByText('Volume Timeline')
  expect(card).toBeInTheDocument()
})
