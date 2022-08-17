const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

const JWT_SECRET = 'keyytato'

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
