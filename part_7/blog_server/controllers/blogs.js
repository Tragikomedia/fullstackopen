const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { updateObjFromReq } = require('../utils/update_helper');
const { unequalIds } = require('../utils/user_helper');
require('express-async-errors');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

router.post('/', async (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ error: 'Only authenticated users can post blogs' });
  const newBlog = await Blog.fromReq(req);
  await newBlog.save();
  await User.addBlog(newBlog);
  const blogToReturn = await Blog.findById(newBlog.id).populate('user');
  res.status(201).json(blogToReturn);
});

router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).end();
  const { comment } = req.body;
  blog.comments.push(comment);
  await blog.save();
  res.status(200).json(blog);
});

router.put('/:id', async (req, res) => {
  const updateObj = updateObjFromReq(req);
  const onlyLike = Object.keys(updateObj).length === 1 && updateObj?.likes;
  if (!req.user && !onlyLike)
    return res.status(401).json({ error: 'Unauthorized operation' });
  const id = req.params.id;
  const blogToUpdate = await Blog.findById(id);
  if (!blogToUpdate) return res.status(404).end();
  if (!onlyLike && unequalIds(req.user._id, blogToUpdate.user))
    return res.status(401).json({ error: 'Unauthorized operation' });
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateObj, {
    new: true,
    runValidators: true,
  }).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  res.status(200).json(updatedBlog);
});

router.delete('/:id', async (req, res) => {
  if (!req.user)
    return res.status(401).json({ error: 'Unauthorized operation' });
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (blog) {
    if (unequalIds(req.user._id, blog.user))
      return res.status(401).json({ error: 'Unauthorized operation' });
    await blog.remove();
  }
  res.status(204).end();
});

module.exports = router;
