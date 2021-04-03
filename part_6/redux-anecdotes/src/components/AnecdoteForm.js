import { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const createAnecdote = async (event) => {
    event.preventDefault();
    dispatch(create(content));
    setContent('');
    dispatch(showNotification(`Created note ${content}`));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input
            name="content"
            type="text"
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
