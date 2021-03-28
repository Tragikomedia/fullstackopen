const router = require('express').Router();
const User = require('../models/user');
require('express-async-errors');

router.get('/', async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.fromReq(req);
  await newUser.save();
  res.status(201).json(newUser);
});

module.exports = router;