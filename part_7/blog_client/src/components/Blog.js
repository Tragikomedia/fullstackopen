import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { del, like } from '../actions/blogActions';
import notify from '../actions/notificationActions';

const Blog = ({ blog }) => {
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

  return (
    <div className="blog">
      <ul>
        <li>
          {blog.title} {blog.author}
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

export default Blog;
