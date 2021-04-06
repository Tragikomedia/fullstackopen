import loginService from '../services/login';
import blogService from '../services/blogs';

export const logIn = async (credentials) => {
  const user = await loginService.login(credentials);
  loginService.save(user);
  blogService.setToken(user.token);
  return {
    type: 'LOG_IN',
    data: {
      user: {
        name: user.name,
        username: user.username,
      },
    },
  };
};

export const retrieve = () => {
  const user = loginService.load();
  blogService.setToken(user.token);
  return { type: 'LOG_IN', data: { user } };
};

export const logOut = () => {
  loginService.clear();
  blogService.clearToken();
  return { type: 'LOG_OUT' };
};
