import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const CREATE_BOOK = gql`
  mutation AddBook(
    $title: String!
    $published: Int!
    $genres: [String!]!
    $author: String!
  ) {
    addBook(
      title: $title
      published: $published
      genres: $genres
      author: $author
    ) {
      title
      published
      genres
    }
  }
`
export const ADD_YEAR = gql`
  mutation addYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const MY_BOOKS = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`
//bookCount      author
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
