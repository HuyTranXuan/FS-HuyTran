const { gql } = require('apollo-server')
const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    id: String!
    born: String
    bookCount: Int!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
    editAuthor(name: String!, setBornTo: Int!): Author
  }
  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs
