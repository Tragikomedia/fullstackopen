import { useState } from 'react';
import notify from '../actions/notificationActions';
import { useDispatch } from 'react-redux';
import { addComment } from '../actions/blogActions';

const CommentField = ({ blog }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentAction = await addComment(blog, value);
      dispatch(commentAction);
      dispatch(notify('Added comment', 'info'));
      setValue('');
    } catch {
      dispatch(notify('Could not add comment', 'error'));
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Type your comment"
          type="text"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};

export default CommentField;
