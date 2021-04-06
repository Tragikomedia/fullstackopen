import { useEffect } from 'react';
import MessageDisplay from './components/MessageDisplay';
import LoginPage from './components/LoginPage';
import BlogPage from './components/BlogPage';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, retrieve } from './actions/userActions';
import { Switch, Route, Redirect } from 'react-router-dom';
import UsersPage from './components/UsersPage';

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
        </>
      )}
      <Switch>
        <Route path="/login">
          {!user ? (
            <LoginPage>
              <MessageDisplay />
            </LoginPage>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/users">
          <UsersPage>
            <MessageDisplay />
          </UsersPage>
        </Route>
        <Route path="/">
          {user ? (
            <>
              <BlogPage>
                <MessageDisplay />
              </BlogPage>
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
