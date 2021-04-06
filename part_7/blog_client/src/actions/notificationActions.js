const showNotification = (message, type) => {
  return { type: 'SHOW_NOTIFICATION', data: { message, type } };
};

const removeNotification = () => {
  return { type: 'SHOW_NOTIFICATION', data: { message: '', type: 'none' } };
};

const notify = async (message, type, timeout = 5) => (dispatch) => {
  dispatch(showNotification(message, type));
  setTimeout(() => removeNotification(), timeout * 1000);
};

export default notify;
