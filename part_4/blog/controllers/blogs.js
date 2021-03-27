const router = require('express').Router();
const Blog = require('../models/blog');
const { updateObjFromReq } = require('../utils/update_helper');
require('express-async-errors');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const newBlog = Blog.fromReq(req);
  await newBlog.save();
  res.status(201).json(newBlog);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updateObj = updateObjFromReq(req);
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateObj, {
    new: true,
    runValidators: true,
  });
  if (!updatedBlog) return res.status(404).end();
  res.status(200).json(updatedBlog);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

module.exports = router;
