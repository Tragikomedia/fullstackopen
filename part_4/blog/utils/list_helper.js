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

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
};
