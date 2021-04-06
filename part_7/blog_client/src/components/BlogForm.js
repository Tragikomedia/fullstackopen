import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { create } from '../actions/blogActions';
import notify from '../actions/notificationActions';

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();
  const resetFields = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const blog = { title, author, url };
    try {
      const createAction = await create(blog);
      dispatch(createAction);
      dispatch(notify(`Blog ${blog.title} added successfully`, 'info'));
      resetFields();
      toggleVisibility();
    } catch (error) {
      const msg = error?.response?.data?.error ?? 'Something went wrong';
      dispatch(notify(msg, 'error'));
    }
  };

  return (
    <>
      <h3>Create new blog</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Author">Author</label>
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Url">Url</label>
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func,
};

export default BlogForm;
