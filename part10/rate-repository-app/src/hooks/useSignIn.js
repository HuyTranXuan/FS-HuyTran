import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient, useMutation } from '@apollo/client'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const data = await mutate({ username, password })
    await authStorage.setAccessToken(data.data.authenticate.accessToken)
    apolloClient.resetStore()
    return data
  }

  return [signIn, result]
}

export default useSignIn
