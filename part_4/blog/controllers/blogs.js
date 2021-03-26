const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const newBlog = new Blog({ title, author, url, likes });
  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
