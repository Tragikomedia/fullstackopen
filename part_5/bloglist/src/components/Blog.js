import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [expand, setExpand] = useState(false);

  const giveLike = () => {
    likeBlog(blog);
  };

  const del = () => {
    deleteBlog(blog);
  };

  return (
    <div className="blog">
      <ul>
        <li>
          {blog.title} {blog.author}
          <button onClick={() => setExpand(!expand)} data-cy='expandBtn'>
            {expand ? 'Hide' : 'Expand'}
          </button>
        </li>
        {expand && (
          <>
            <li>{blog.url}</li>
            <li data-cy='likeLi'>
              {`likes ${blog.likes}`}{' '}
              <button onClick={giveLike} data-cy='likeBtn'>
                Like
              </button>
            </li>
            <li>{blog.user.name}</li>
            <li>
              <button className="delete" onClick={del} data-cy='deleteBtn'>
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
