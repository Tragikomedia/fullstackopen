const { ApolloServer, gql } = require('apollo-server');

let { books, authors } = require('./resources');
const { v1: uuid } = require('uuid');

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
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
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const filterBooksByArgs = (args) => {
  let booksToReturn = books;
  if (args.author)
    booksToReturn = booksToReturn.filter(
      ({ author }) => author === args.author
    );
  if (args.genre)
    booksToReturn = booksToReturn.filter(({ genres }) =>
      genres.includes(args.genre)
    );
  return booksToReturn;
};

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => filterBooksByArgs(args),
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find(author => author.name === args.author))
        authors.push({ name: args.author, id: uuid() });
      const book = {
        ...args,
        id: uuid(),
      };
      books.push(book);
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => args.name === author.name);
      if (!author) return null;
      const updatedAuthor = {...author, born: args.setBornTo};
      authors = authors.map(origAuthor => origAuthor.id === author.id ? updatedAuthor : origAuthor);
      return updatedAuthor;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
