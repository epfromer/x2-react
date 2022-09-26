import { useAuth0 } from '@auth0/auth0-react'
import { fireEvent } from '@testing-library/react'
import { renderComp } from '../../../setupTests'
import SettingsMenu from '../SettingsMenu'

jest.mock('@auth0/auth0-react')
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
}
// @ts-ignore
useAuth0.mockReturnValue({
  isAuthenticated: true,
  user,
  logout: jest.fn(),
  loginWithRedirect: jest.fn(),
})

test('renders', async () => {
  const { getByTestId } = renderComp(<SettingsMenu />)
  let button = getByTestId('sign-out')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
