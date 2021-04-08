import { useEffect } from 'react';
import MessageDisplay from './components/MessageDisplay';
import LoginPage from './components/LoginPage';
import BlogPage from './components/BlogPage';
import { useDispatch, useSelector } from 'react-redux';
import { retrieve } from './actions/userActions';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import UsersPage from './components/UsersPage';
import UserPage from './components/UserPage';
import Blog from './components/Blog';
import Menu from './components/Menu';
import { StyledApp } from './components/Styled';

function App() {
  const user = useSelector(({ user }) => user);
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieve());
  }, []);

  const userMatch = useRouteMatch('/users/:id');
  const userFromMatch = (match) => {
    if (!(match && users.length)) return null;
    const id = match.params.id;
    return users.find((user) => user.id === id);
  };
  const userById = userFromMatch(userMatch);

  const blogMatch = useRouteMatch('/blogs/:id');
  const blogFromMatch = (match) => {
    if (!(match && blogs.length)) return null;
    const id = match.params.id;
    return blogs.find((blog) => blog.id === id);
  };
  const blogById = blogFromMatch(blogMatch);

  return (
    <StyledApp className={'App'}>
      <Menu />
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
        <Route path="/users/:id">
          <UserPage user={userById}>
            <MessageDisplay />
          </UserPage>
        </Route>
        <Route path="/users">
          <UsersPage>
            <MessageDisplay />
          </UsersPage>
        </Route>
        <Route path="/blogs/:id">
          <MessageDisplay />
          <Blog blog={blogById} isStandalone={true} />
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
    </StyledApp>
  );
}

export default App;
