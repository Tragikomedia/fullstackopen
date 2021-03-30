import LoginForm from "./LoginForm";

const LoginPage = (props) => {
  const {handleLogin, children} = props;
  return (
    <>
    <h2>Please log in to use the app</h2>
    {children}
    <LoginForm handleLogin={handleLogin} />
    </>
  );
};

export default LoginPage;