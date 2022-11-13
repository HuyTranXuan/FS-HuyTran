import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          fullName
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`
export const GET_REGISTERED_USERS = gql`
  query {
    users {
      edges {
        node {
          username
        }
      }
    }
  }
`

export const IS_AUTHENTICATED = gql`
  query {
    me {
      id
      username
    }
  }
`
