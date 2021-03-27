const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');

describe('Dummy', () => {
  it('Given an array of blogs, dummy should return 1', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('Total likes', () => {
  it('Given an empty array, should return zero', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });
  it('Given an array with 1 blog, should return its likes', () => {
    const likes = 7;
    const blogs = [
      new Blog({ title: 'Title', author: 'Author', url: 'url.com', likes }),
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(likes);
  });
  it('Given an array with many blogs, should return total number of likes', () => {
    const likes = [2, 4, 27];
    const total = likes.reduce((acc, like) => acc + like);
    const blogs = likes.map(
      (like, index) =>
        new Blog({
          title: 'Title' + index,
          author: 'Author' + index,
          url: 'url.com' + index,
          likes: like,
        })
    );
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(total);
  });
});

describe('Favorite blog', () => {
  it('Given an empty array, should return null', () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toBeNull();
  });
  it('Given an array with 1 blog, should return the result for that blog', () => {
    const likes = 7;
    const blog = new Blog({
      title: 'Title',
      author: 'Author',
      url: 'url.com',
      likes,
    });
    const blogs = [blog];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    });
  });
  it('Given an array with many blogs, should return the most liked blog', () => {
    const likes = [2, 4, 27];
    const topBlog = new Blog({
      title: 'TOP',
      author: 'BLOG',
      url: 'topblog.com',
      likes: 9999,
    });
    const blogs = [
      ...likes.map(
        (like, index) =>
          new Blog({
            title: 'Title' + index,
            author: 'Author' + index,
            url: 'url.com' + index,
            likes: like,
          })
      ),
      topBlog,
    ];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: topBlog.title,
      author: topBlog.author,
      likes: topBlog.likes,
    });
  });
});

describe('Most blogs', () => {
  it('Given an empty array, should return null', () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toBeNull();
  });
  it('Given an one-element array, should return info about this element', () => {
    const author = 'Author';
    const blog = new Blog({
      title: 'Title',
      author,
      url: 'url.com',
      likes: 57,
    });
    const result = listHelper.mostBlogs([blog]);
    expect(result).toEqual({ author, blogs: 1 });
  });
  it('Given an array of blogs, should return an object with a number of blog of the author with most blogs', () => {
    const topAuthor = 'TOP AUTHOR';
    const topAuthorBlogs = [1, 2, 3].map(
      (num) =>
        new Blog({
          title: `TopTitle${num}`,
          author: topAuthor,
          url: `url.com/${num}`,
          likes: num,
        })
    );
    const regularBlogs = [4, 5, 6, 7].map(
      (num) =>
        new Blog({
          title: `Regular Blog ${num}`,
          author: `Reg Author ${num}`,
          url: `url.com${num}`,
          likes: num,
        })
    );
    const result = listHelper.mostBlogs([...regularBlogs, ...topAuthorBlogs]);
    expect(result).toEqual({ author: topAuthor, blogs: topAuthorBlogs.length });
  });
});
