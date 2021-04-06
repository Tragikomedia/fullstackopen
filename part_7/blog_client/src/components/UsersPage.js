import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import notify from '../actions/notificationActions';
import usersService from '../services/users';
import PropTypes from 'prop-types';

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
              <td>{user.name}</td>
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
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await usersService.getAll();
        setUsers(users);
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
