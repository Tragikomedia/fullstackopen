require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL =
  NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { DATABASE_URL, NODE_ENV, JWT_SECRET, PORT };
