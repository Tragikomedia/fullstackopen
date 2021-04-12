const {
  ApolloServer,
  AuthenticationError,
  UserInputError,
  PubSub,
  gql,
} = require('apollo-server');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const config = require('./config/env');
const jwt = require('jsonwebtoken');
const pubSub = new PubSub();

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addAuthor(name: String!, born: Int): Author!
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const genToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      id: user.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
};

const filterBooksByArgs = async (args) => {
  const author = args.author
    ? await Author.findOne({ name: args.author })
    : null;
  let books = author
    ? await Book.find({ author: author.id })
    : await Book.find({});
  if (args.genre) {
    books = books.filter((book) => book.genres.includes(args.genre));
  }
  return books;
};

const authenticate = async ({ req }) => {
  const auth = req?.headers?.authorization;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const token = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(token.id);
      return { currentUser };
    } catch {
      return {};
    }
  }
};

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => filterBooksByArgs(args),
    allAuthors: () => Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id });
      return books.length;
    },
  },
  Book: {
    author: (root) => Author.findById(root.author),
  },
  Mutation: {
    addAuthor: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError(
          'You must be logged in to perform this action'
        );
      try {
        const author = new Author({ ...args });
        await author.save();
        return author;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError(
          'You must be logged in to perform this action'
        );
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
        const book = new Book({ ...args, author: author.id });
        await book.save();
        pubSub.publish('BOOK_ADDED', { bookAdded: book });
        return book;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError(
          'You must be logged in to perform this action'
        );
      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
        if (!author) return null;
        return author;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ ...args });
        await user.save();
        return user;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username,
        password: args.password,
      });
      if (!user) throw new AuthenticationError('Invalid credentials');
      let token;
      try {
        token = genToken(user);
      } catch {
        throw new AuthenticationError('Invalid credentials');
      }
      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authenticate,
});

module.exports = server;
