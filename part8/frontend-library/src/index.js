import React from 'react'
import ReactDOM from 'react-dom'

import { setContext } from 'apollo-link-context'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import App from './App'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('lib-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})
const httpLink = new HttpLink({
  uri: `https://library-app-txh.herokuapp.com/`,
})

const wsLink = new WebSocketLink({
  uri: `wss://library-app-txh.herokuapp.com/`,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
