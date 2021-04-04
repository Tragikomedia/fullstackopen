const initialState = "";

const setNotification = (notification) => ({
  type: "SET_NOTIFICATION",
  data: { notification },
});

const removeNotification = () => setNotification("");

let curTimeout;

export const showNotification = (notification, timeout = 5) => {
  return (dispatch) => {
    dispatch(setNotification(notification));
    if (curTimeout) clearTimeout(curTimeout);
    curTimeout = setTimeout(
      () => dispatch(removeNotification()),
      timeout * 1000
    );
  };
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
