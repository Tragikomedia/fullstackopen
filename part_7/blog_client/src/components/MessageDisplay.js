import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const MessageDisplay = ({ type, message }) => (
  <div className={`${type}-display`}>
    <p>{message}</p>
  </div>
);

MessageDisplay.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

const MessageDisplayContainer = () => {
  const [type, message] = useSelector(({ notification }) => [
    notification.type,
    notification.message,
  ]);

  if (type === 'none') return null;

  return (
    <>
      <MessageDisplay type={type} message={message} />{' '}
    </>
  );
};

export default MessageDisplayContainer;
