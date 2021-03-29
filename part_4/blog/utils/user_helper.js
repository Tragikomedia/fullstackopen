const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

const saltRounds = 10;

const hashPassword = async (password) =>
  await bcrypt.hash(password, saltRounds);
const decodeToken = (token) => jwt.verify(token, config.JWT_SECRET);
const unequalIds = (id1, id2) => !(id1?.toString?.() === id2?.toString?.());

module.exports = { decodeToken, hashPassword, unequalIds };
