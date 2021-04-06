const showNotification = (message, type) => {
  return { type: 'SHOW_NOTIFICATION', data: { message, type } };
};

const removeNotification = () => {
  return { type: 'SHOW_NOTIFICATION', data: { message: '', type: 'none' } };
};

let currentTimeout;

const notify = (message, type, timeout = 5) => (dispatch) => {
  dispatch(showNotification(message, type));
  if (currentTimeout) clearTimeout(currentTimeout);
  currentTimeout = setTimeout(() => {
    dispatch(removeNotification());
  }, timeout * 1000);
};

export default notify;
