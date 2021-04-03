import anecdotesService from "../services/anecdotes";

const initialState = [];

export const vote = (id) => ({ type: "VOTE", data: { id } });
export const create = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.save(content);
    dispatch({ type: "CREATE", data: { anecdote } });
  };
};
export const init = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: { anecdotes },
    });
  };
};

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
