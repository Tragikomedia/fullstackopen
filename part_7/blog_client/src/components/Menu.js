import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../actions/userActions';

const Menu = ({ menuItems }) => {
  return (
    <>
      <nav style={{ backgroundColor: 'orange' }}>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {menuItems.map((item, index) => (
            <li style={{ paddingRight: '0.5rem' }} key={index}>
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

const MenuContainer = () => {
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logOut());
  };

  const blogsLink = <Link to="/">blogs</Link>;
  const usersLink = <Link to="/users">users</Link>;
  const loginBar = user ? (
    <>
      <h3 style={{ display: 'inline-block' }}>Hello {user.name}</h3>
      <button onClick={handleLogout}>Log out</button>
    </>
  ) : null;

  const menuItems = [blogsLink, usersLink, loginBar];
  return (
    <>
      <Menu menuItems={menuItems} />
    </>
  );
};

export default MenuContainer;
