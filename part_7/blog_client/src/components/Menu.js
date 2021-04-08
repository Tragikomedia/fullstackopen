import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../actions/userActions';
import { Nav, Ul, NavLi } from './Styled';

const Menu = ({ menuItems }) => {
  return (
    <>
      <Nav>
        <Ul>
          {menuItems.map((item, index) => (
            <NavLi key={index}>{item}</NavLi>
          ))}
        </Ul>
      </Nav>
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
      <h3>Hello {user.name}</h3>
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
