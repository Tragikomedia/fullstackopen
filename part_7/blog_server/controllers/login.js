const router = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('express-async-errors');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect))
    return res.status(401).json({ error: 'Invalid username or password' });
  const userForToken = {
    username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.JWT_SECRET);
  res.status(200).json({ token, username, name: user.name });
});

module.exports = router;