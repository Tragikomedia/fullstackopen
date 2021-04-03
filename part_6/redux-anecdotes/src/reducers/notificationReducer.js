const initialState = "";

const setNotification = (notification) => ({
  type: "SET_NOTIFICATION",
  data: { notification },
});

const removeNotification = () => setNotification("");

export const showNotification = (notification, timeout = 5000) => {
  return dispatch => {
    dispatch(setNotification(notification));
    setTimeout(() => dispatch(removeNotification()), timeout);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.data.notification;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
