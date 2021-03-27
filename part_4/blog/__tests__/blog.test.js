const Blog = require('../models/blog');

describe('Blog', () => {
  it('Given a properly structured blog, it should possesses an id field', () => {
    const blog = new Blog({
      title: 'Blog',
      author: 'Author',
      url: 'example.com',
      likes: 45,
    });
    expect(blog.id).toBeDefined();
  });
});
