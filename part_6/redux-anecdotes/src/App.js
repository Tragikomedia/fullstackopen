import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote, create } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const voteFor = (id) => {
    dispatch(vote(id));
  };

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(create(content));
  };

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App;
