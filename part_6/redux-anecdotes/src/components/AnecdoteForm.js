import { useState } from "react";
import { connect } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({create, showNotification}) => {
  const [content, setContent] = useState("");

  const createAnecdote = async (event) => {
    event.preventDefault();
    create(content);
    setContent("");
    showNotification(`Created note ${content}`);
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

const mapDispatchToProps = (dispatch) => ({
  create: (value) => {
    dispatch(create(value));
  },
  showNotification: (value) => {
    dispatch(showNotification(value));
  },
});

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
