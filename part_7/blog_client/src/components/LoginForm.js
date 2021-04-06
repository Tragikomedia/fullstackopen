import { useState } from 'react';
import PropTypes from 'prop-types';
import { logIn } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import notify from '../actions/notificationActions';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const resetFields = () => {
    setUsername('');
    setPassword('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginAction = await logIn({ username, password });
      dispatch(loginAction);
      dispatch(
        notify(`Successfully logged as ${loginAction.data.user.name}`, 'info')
      );
      resetFields();
    } catch (error) {
      const msg = error?.response?.data?.error ?? 'Something went wrong';
      dispatch(notify(msg, 'error'));
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="Username">Username </label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Password">Password </label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
};

export default LoginForm;
