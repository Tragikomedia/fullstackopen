import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { del, like } from '../actions/blogActions';
import notify from '../actions/notificationActions';
import { Link } from 'react-router-dom';

const Blog = ({ blog, isStandalone }) => {
  if (!blog) return null;

  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();

  const giveLike = async () => {
    try {
      const likeAction = await like(blog);
      dispatch(likeAction);
    } catch (error) {
      dispatch(notify('Could not like blog', 'error'));
    }
  };

  const delBlog = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}?`
      )
    )
      return;
    try {
      const delAction = await del(blog);
      dispatch(delAction);
      dispatch(notify(`Successfully deleted blog ${blog.title}`, 'info'));
    } catch (error) {
      dispatch(notify('Could not delete blog', 'error'));
    }
  };

  return isStandalone ? (
    <>
      <ul style={{ listStyle: 'none' }}>
        <li>
          <h3>
            {blog.title} by {blog.author}
          </h3>
        </li>
        <>
          <li><a href={blog.url}>{blog.url}</a></li>
          <li data-cy="likeLi">
            {`likes ${blog.likes}`}{' '}
            <button onClick={giveLike} data-cy="likeBtn">
              Like
            </button>
          </li>
          <li>added by {blog.user.name}</li>
        </>
      </ul>{' '}
    </>
  ) : (
    <div className="blog">
      <ul>
        <li>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
          <button onClick={() => setExpand(!expand)} data-cy="expandBtn">
            {expand ? 'Hide' : 'Expand'}
          </button>
        </li>
        {expand && (
          <>
            <li>{blog.url}</li>
            <li data-cy="likeLi">
              {`likes ${blog.likes}`}{' '}
              <button onClick={giveLike} data-cy="likeBtn">
                Like
              </button>
            </li>
            <li>{blog.user.name}</li>
            <li>
              <button className="delete" onClick={delBlog} data-cy="deleteBtn">
                Delete
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object,
  }),
  likeBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
};

Blog.defaultProps = {
  isStandalone: false,
};

export default Blog;
