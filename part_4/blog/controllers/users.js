const router = require('express').Router();
const User = require('../models/user');
require('express-async-errors');

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  });
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.fromReq(req);
  await newUser.save();
  res.status(201).json(newUser);
});

module.exports = router;
