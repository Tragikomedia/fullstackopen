import { useEffect } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Toggleable from './Toggleable';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../actions/notificationActions';
import { init } from '../actions/blogActions';

const BlogPage = ({ children }) => {
  const blogs = useSelector(({ blogs }) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const initAction = await init();
        dispatch(initAction);
      } catch {
        dispatch(notify('Blogs could not have been retrieved', 'error'));
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <h2>Blogs</h2>
      {children}
      <Toggleable label={'Add blog'}>
        <BlogForm />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

BlogPage.propTypes = {
  children: PropTypes.object,
};

export default BlogPage;
