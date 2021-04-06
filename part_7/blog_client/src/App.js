import { useEffect } from 'react';
import MessageDisplay from './components/MessageDisplay';
import LoginPage from './components/LoginPage';
import BlogPage from './components/BlogPage';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, retrieve } from './actions/userActions';

function App() {
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieve());
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logOut());
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
        <LoginPage>
          <MessageDisplay />
        </LoginPage>
      )}
    </div>
  );
}

export default App;
