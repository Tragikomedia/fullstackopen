const initialState = "";

const setNotification = (notification) => ({
  type: "SET_NOTIFICATION",
  data: { notification },
});

const removeNotification = () => setNotification("");

export const showNotification = (dispatch, notification) => {
  dispatch(setNotification(notification));
  setTimeout(() => dispatch(removeNotification()), 5000);
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
