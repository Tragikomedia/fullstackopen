import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const blog = { title, author, url };
    addBlog(blog);
    setTitle('');
    setAuthor('');
    setUrl('');
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
