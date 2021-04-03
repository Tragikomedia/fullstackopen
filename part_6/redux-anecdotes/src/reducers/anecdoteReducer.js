const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [];

export const vote = (id) => ({ type: "VOTE", data: { id } });
export const create = (anecdote) => ({ type: "CREATE", data: { anecdote } });
export const init = (anecdotes) => ({
  type: "INIT_ANECDOTES",
  data: { anecdotes },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    }
    case "CREATE": {
      const { anecdote } = action.data;
      return state.concat(anecdote);
    }
    case "INIT_ANECDOTES": {
      return [...action.data.anecdotes];
    }
    default: {
      return state;
    }
  }
};

export default reducer;
