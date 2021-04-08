import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { del, like } from '../actions/blogActions';
import notify from '../actions/notificationActions';
import { Link, useHistory } from 'react-router-dom';
import CommentField from './CommentField';

const Blog = ({ blog, isStandalone }) => {
  if (!blog) return null;
  const dispatch = useDispatch();
  const history = useHistory();

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
      history.push('/');
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
          <li>
            <a href={blog.url}>{blog.url}</a>
          </li>
          <li data-cy="likeLi">
            {`likes ${blog.likes}`}
            <button onClick={giveLike} data-cy="likeBtn">
              Like
            </button>
          </li>
          <li>added by {blog.user.name}</li>
          <li>
            <button className="delete" onClick={delBlog} data-cy="deleteBtn">
              Delete
            </button>
          </li>
        </>
      </ul>
      <div>
        <h3>Comments</h3>
        <CommentField blog={blog} />
        <ul>
          {blog.comments.length ? blog.comments.map((comment, index) => (
            <li key={`${index}+${comment}`}>{comment}</li>
          )) : 'No comments'}
        </ul>
      </div>
    </>
  ) : (
    <div className="blog">
      <ul>
        <li>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
        </li>
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
