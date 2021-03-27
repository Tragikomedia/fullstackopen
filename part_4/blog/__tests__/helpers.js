const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'blog1',
    author: 'Author1',
    url: 'example1.com',
    likes: 5,
  },
  {
    title: 'blog2',
    author: 'Author2',
    url: 'example2.com',
    likes: 6,
  },
  {
    title: 'blog3',
    author: 'Author3',
    url: 'example3.com',
    likes: 23,
  },
];

const emptyDb = async () => await Blog.deleteMany({});

const saveInitialBlogs = async () => {
  const blogs = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());
  await Promise.all(promiseArray);
};

const allSavedBlogs = async () => await Blog.find({});

module.exports = {
  allSavedBlogs,
  emptyDb,
  initialBlogs,
  saveInitialBlogs,
};
