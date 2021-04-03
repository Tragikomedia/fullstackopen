import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    const anecdote = await anecdotesService.save(content);
    dispatch(create(anecdote));
    showNotification(dispatch, `Created note ${content}`);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" type="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
