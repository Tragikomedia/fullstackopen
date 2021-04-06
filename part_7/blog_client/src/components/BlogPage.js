import { useEffect, useRef, useState } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Toggleable from './Toggleable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import notify from '../actions/notificationActions';

const BlogPage = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const dispatch = useDispatch();

  useEffect(
    () =>
      (async () => {
        try {
          const dbBlogs = await blogService.getAll();
          setBlogs(dbBlogs);
        } catch {
          dispatch(notify('Blogs could not have been retrieved', 'error'));
        }
      })(),
    // eslint-disable-next-line
    []
  );

  const createBlogRef = useRef();

  const addBlog = async (blogData) => {
    try {
      const blog = await blogService.create(blogData);
      setBlogs(blogs.concat(blog));
      createBlogRef.current.toggleVisibility();
      dispatch(notify(`Blog ${blog.title} added successfully`, 'info'));
    } catch (error) {
      const msg = error?.response?.data?.error ?? 'Something went wrong';
      dispatch(notify(msg, 'error'));
    }
  };

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog);
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
      setBlogs(updatedBlogs);
    } catch {
      dispatch(notify('Could not like blog', 'error'));
    }
  };

  const deleteBlog = async (blog) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}?`
      )
    )
      return;
    try {
      await blogService.del(blog);
      const remainingBlogs = blogs.filter((remBlog) => remBlog.id !== blog.id);
      setBlogs(remainingBlogs);
      dispatch(notify(`Successfully deleted ${blog.title}`, 'info'));
    } catch {
      dispatch(notify('Could not delete blog', 'error'));
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Blogs</h2>
      {children}
      <Toggleable label={'Add blog'} ref={createBlogRef}>
        <BlogForm addBlog={addBlog} />
      </Toggleable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </>
  );
};

BlogPage.propTypes = {
  children: PropTypes.array,
};

export default BlogPage;
