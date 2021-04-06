import LoginForm from './LoginForm';
import PropTypes from 'prop-types';

const LoginPage = ({ handleLogin, children }) => {
  return (
    <>
      <h2>Please log in to use the app</h2>
      {children}
      <LoginForm handleLogin={handleLogin} />
    </>
  );
};

LoginPage.propTypes = {
  handleLogin: PropTypes.func,
  children: PropTypes.object,
};

export default LoginPage;
