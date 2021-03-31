import PropTypes from 'prop-types';

const MessageDisplay = ({ type, message }) => (
  <div className={`${type}-display`}>
    <p>{message}</p>
  </div>
);

MessageDisplay.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default MessageDisplay;
