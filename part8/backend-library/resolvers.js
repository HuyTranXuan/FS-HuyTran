const Book = require('./book')
const Author = require('./author')
const User = require('./user')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'keyytato'
// let c = 0

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),

    allAuthors: async (root, args) => {
      const dict = {}
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      authors.forEach((a) => (dict[a.id] = 0))
      books.forEach((b) => (dict[b.author.id] = dict[b.author.id] + 1))

      const result = authors.map((a) => {
        a.bookCount = dict[a.id]
        return a
      })
      return result
    },

    allBooks: async (root, args) => {
      if (args.author) {
        if (args.genre) {
          return await Book.find({
            author: args.author,
            genres: { $in: [args.genre] },
          }).populate('author')
        }
        return await Book.find({ author: args.author }).populate('author')
      }
      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate(
          'author'
        )
      }
      return await Book.find({}).populate('author')
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (args.title.length < 2 || args.author.length < 2) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author })
      try {
        await book.save()
        // currentUser.books = currentUser.books.concat(book)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
        password: args.password,
      })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers

/**

const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]
  bookCount: () => books.length,
  allBooks: (root, args) => {
    if (args.author) return books.filter((b) => b.author === args.author)
    else if (args.genre)
      return books.filter((b) => b.genres.some((g) => args.genre.includes(g)))
    else return books
  },
  Author: {
  bookCount: ({ name }) => {
    const myBooks = books.filter((b) => b.author === name)
    return myBooks.length
    },
  },
  
  addBook: (root, args) => {
    const book = { ...args, id: uuid() }
    let author = authors.find((a) => a.name === args.author)
    books = books.concat(book)
    if (author === undefined) {
      author = {
        name: args.author,
        born: null,
        id: uuid(),
      }
      authors = authors.concat(author)
    }
    return book
  },
  editAuthor: (root, args) => {
    const author = authors.find((a) => a.name === args.name)
    const editAuthor = { name: args.name, born: args.setBornTo }
    if (author !== undefined) {
      authors = authors.map((a) =>
        a.name === args.name ? { ...a, born: args.setBornTo } : a
      )
      return editAuthor
    }
    return null
  },
*/
