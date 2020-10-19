import * as AuthSessionNew from 'expo-auth-session'
import ENV from '../../env'

const toQueryString = (params: any) =>
  '?' +
  Object.entries(params)
    .map(
      //@ts-ignore
      ([key, value]) =>
        //@ts-ignore
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')

const handleLoginResponse = (response: any) => {
  console.log(response)
}

export async function signIn() {
  const params = {
    client_id: ENV.auth0ClientId,
    redirect_uri: AuthSessionNew.makeRedirectUri({ useProxy: true }),
    // response_type:
    // id_token will return a JWT token with the profile as described on the scope
    // token will return access_token to use with further api calls
    response_type: 'token id_token',
    nonce: 'nonce', // ideally, this will be a random value
    rememberLastLogin: true,
  }
  const queryParams = toQueryString(params)
  const authUrl = `https://${ENV.auth0Domain}/authorize${queryParams}`
  const response = await AuthSessionNew.startAsync({
    authUrl,
    showInRecents: true,
  })
  return handleLoginResponse(response)
}

export async function signOut() {}

export function isAuthenticated() {}
