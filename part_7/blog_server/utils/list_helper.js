const countBy = require('lodash.countby');
const maxBy = require('lodash.maxby');

const dummy = (blogs) => {
  if (blogs || !blogs) return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, blog) => acc + blog.likes;
  const total = blogs.reduce(reducer, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;
  const reducer = (top, curr) => (top.likes >= curr.likes ? top : curr);
  const { title, author, likes } = blogs.reduce(reducer);
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;
  const results = countBy(blogs, 'author');
  const mostBlogsAuthor = maxBy(
    Object.keys(results),
    (author) => results[author]
  );
  return { author: mostBlogsAuthor, blogs: results[mostBlogsAuthor] };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;
  const authorsByLikes = {};
  const countLikes = (blog) =>
    authorsByLikes[blog.author]
      ? (authorsByLikes[blog.author] += blog.likes)
      : (authorsByLikes[blog.author] = blog.likes);
  blogs.forEach(countLikes);
  const mostLikedAuthor = maxBy(
    Object.keys(authorsByLikes),
    (author) => authorsByLikes[author]
  );
  return { author: mostLikedAuthor, likes: authorsByLikes[mostLikedAuthor] };
};

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
};
