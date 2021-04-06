const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'GET_ALL_USERS': {
    return [...action.data.users];
  }
  default: {
    return state;
  }
  }
};

export default reducer;
