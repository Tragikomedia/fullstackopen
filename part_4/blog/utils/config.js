require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL =
  NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;
const PORT = process.env.PORT;
const PASSWORD_SECRET = process.env.PASSWORD_SECRET;

module.exports = { DATABASE_URL, NODE_ENV, PASSWORD_SECRET, PORT };
