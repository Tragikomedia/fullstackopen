import LoginForm from './LoginForm';
import PropTypes from 'prop-types';

const LoginPage = ({ children }) => {
  return (
    <>
      <h2>Please log in to use the app</h2>
      {children}
      <LoginForm />
    </>
  );
};

LoginPage.propTypes = {
  children: PropTypes.object,
};

export default LoginPage;
