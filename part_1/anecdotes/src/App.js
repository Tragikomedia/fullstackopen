import React, { useState } from "react";
import Anecdote from "./Anecdote";
import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const vote = () => {
    const newVotes = votes.slice();
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const mostUpvoted = votes.reduce(
    (highest, current, index) =>
      highest.votes >= current ? highest : { votes: current, index },
    { votes: 0, index: 0 }
  ).index;

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <Button text="VOTE" handleClick={vote} />
      <Button text="Random anecdote" handleClick={randomAnecdote} />
      <br />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostUpvoted]} votes={votes[mostUpvoted]} />
    </div>
  );
};

export default App;
