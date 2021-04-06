const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOG_IN': {
    return action.data.user;
  }
  case 'LOG_OUT': {
    return null;
  }
  default: {
    return state;
  }
  }
};

export default reducer;
