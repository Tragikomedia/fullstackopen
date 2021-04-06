const initialState = { message: '', type: 'none' };

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION': {
    const { message, type } = action.data;
    return { message, type };
  }
  default: {
    return state;
  }
  }
};

export default reducer;
