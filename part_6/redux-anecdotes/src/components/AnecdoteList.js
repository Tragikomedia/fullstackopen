import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote, init } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter(({ content }) =>
        content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const voteFor = (id) => {
    dispatch(vote(id));
    showNotification(
      dispatch,
      `You voted for '${
        anecdotes.find((anecdote) => anecdote.id === id).content
      }'`
    );
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
