const dummy = (blogs) => {
  if (blogs || !blogs) return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, blog) => acc + blog.likes;
  const total = blogs.reduce(reducer, 0);
  return total;
};

module.exports = {
  dummy, totalLikes
};
