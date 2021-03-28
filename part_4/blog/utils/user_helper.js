const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => await bcrypt.hash(password, saltRounds);

module.exports = { hashPassword };