const initialState = "";

export const filterOut = (filter) => ({
  type: "FILTER",
  data: { filter },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER": {
      return action.data.filter;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
