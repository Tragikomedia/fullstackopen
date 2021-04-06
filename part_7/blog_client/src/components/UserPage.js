import { Redirect } from 'react-router-dom';

const UserPage = ({ user, children }) => {
  if (!user) return <Redirect to="/users" />;
  return (
    <div>
      <h3>{user.name}</h3>
      {children}
      <strong>Added blogs</strong>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
