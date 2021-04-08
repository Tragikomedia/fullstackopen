import blogService from '../services/blogs';

export const init = async () => {
  const blogs = await blogService.getAll();
  return { type: 'INIT_BLOG', data: { blogs } };
};

export const create = async (blogData) => {
  const blog = await blogService.create(blogData);
  return { type: 'CREATE_BLOG', data: { blog } };
};

export const del = async (blog) => {
  await blogService.del(blog);
  return { type: 'DELETE_BLOG', data: { id: blog.id } };
};

export const like = async (blog) => {
  const updatedBlog = await blogService.like(blog);
  return { type: 'VOTE_BLOG', data: { blog: updatedBlog } };
};

export const addComment = async (blog, comment) => {
  const updatedBlog = await blogService.comment(blog, comment);
  return { type: 'COMMENT_BLOG', data: { blog: updatedBlog } };
};
