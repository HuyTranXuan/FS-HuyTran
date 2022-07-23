const { gql } = require('apollo-server')
const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }
  type Book {
    title: String!
    author: String!
    published: String!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: String!
    born: String
    bookCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
  }
  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`
module.exports = typeDefs
