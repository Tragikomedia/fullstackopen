const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

const saltRounds = 10;

const hashPassword = async (password) => await bcrypt.hash(password, saltRounds);
const decodeToken = (token) => jwt.verify(token, config.JWT_SECRET);

module.exports = { decodeToken, hashPassword };