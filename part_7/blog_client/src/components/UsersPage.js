import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../actions/notificationActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../actions/usersActions';

const UsersPage = ({ users, children }) => {
  return (
    <div>
      <h3>Users</h3>
      {children}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>Blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UsersPage.propTypes = {
  children: PropTypes.object,
  users: PropTypes.array,
};

const UsersPageContainer = ({ children }) => {
  const users = useSelector(({ users }) => users);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersAction = await getAllUsers();
        dispatch(usersAction);
      } catch {
        dispatch(notify('Could not fetch users\' data', 'error'));
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <UsersPage users={users}>{children}</UsersPage>
    </>
  );
};

export default UsersPageContainer;
