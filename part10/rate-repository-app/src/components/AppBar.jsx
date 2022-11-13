import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'
import { IS_AUTHENTICATED } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage'
import AppBarTab from './AppBarTab'
import { useApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '50px',
    alignItems: 'center',
  },
})

const AppBar = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const { data } = useQuery(IS_AUTHENTICATED, {
    fetchPolicy: 'cache-and-network',
  })
  apolloClient.resetStore()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link={'/home'}>Repositories</AppBarTab>
        {data?.me ? (
          <AppBarTab onClick={signOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab link={'/signIn'}>Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
