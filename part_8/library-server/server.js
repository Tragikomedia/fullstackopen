const { ApolloServer, UserInputError, gql } = require('apollo-server');
const Book = require('./models/book');
const Author = require('./models/author');

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  }
`;

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

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => filterBooksByArgs(args),
    allAuthors: () => Author.find({}),
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
    addAuthor: async (root, args) => {
      try {
        const author = new Author({ ...args });
        await author.save();
        return author;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
        const book = new Book({ ...args, author: author.id });
        await book.save();
        return book;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args) => {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = server;
