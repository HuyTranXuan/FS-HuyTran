import { useApolloClient, useMutation } from '@apollo/client'

import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  const signIn = async ({ username, password }) => {
    const credentials = { username, password }

    const payload = await mutate({ variables: { credentials } })
    const { data } = payload

    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore()
    }

    return payload
  }

  return [signIn, result]
}

export default useSignIn
