import { useState, useEffect } from 'react';
import MessageDisplay from './components/MessageDisplay';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginPage from './components/LoginPage';
import BlogPage from './components/BlogPage';
import { useDispatch } from 'react-redux';
import notify from './actions/notificationActions';

function App() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = loginService.load();
    if (savedUser) {
      blogService.setToken(savedUser.token);
      setUser(savedUser);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      loginService.save(user);
      blogService.setToken(user.token);
      dispatch(notify(`Successfully logged as ${user.name}`, 'info'));
    } catch (error) {
      const msg = error?.response?.data?.error ?? 'Something went wrong';
      dispatch(notify(msg, 'error'));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    loginService.clear();
    blogService.setToken('');
    setUser(null);
  };

  return (
    <div className="App">
      {user && (
        <>
          <h3>Hello {user.name}</h3>
          <button onClick={handleLogout}>Log out</button>
          <BlogPage>
            <MessageDisplay />
          </BlogPage>
        </>
      )}

      {!user && (
        <LoginPage handleLogin={handleLogin}>
          <MessageDisplay />
        </LoginPage>
      )}
    </div>
  );
}

export default App;
