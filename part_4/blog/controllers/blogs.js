const router = require('express').Router();
const Blog = require('../models/blog');
require('express-async-errors');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;
  const newBlog = new Blog({ title, author, url, likes });
  await newBlog.save();
  res.status(201).json(newBlog);
});

module.exports = router;
