import MessageDisplay from './MessageDisplay';

const ErrorDisplay = ({ message }) =>
  MessageDisplay({ type: 'error', message });

export default ErrorDisplay;
