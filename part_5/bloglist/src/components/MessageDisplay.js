const MessageDisplay = ({type, message}) => (
  <div className={`${type}-display`}>
    <p>{message}</p>
  </div>
);

export default MessageDisplay;