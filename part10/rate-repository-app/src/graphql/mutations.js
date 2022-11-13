import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation {
    authenticate(credentials: { username: "kalle", password: "password" }) {
      accessToken
    }
  }
`

export const CREATE_USER = gql`
  mutation {
    createUser(user: { username: "myusername", password: "mypassword" }) {
      id
      username
    }
  }
`
