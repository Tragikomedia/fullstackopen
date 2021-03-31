import { useState, useEffect } from "react";
import InfoDisplay from "./components/InfoDisplay";
import ErrorDisplay from "./components/ErrorDisplay";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginPage from "./components/LoginPage";
import BlogPage from "./components/BlogPage";
import message from "./utils/messageHelper";

function App() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

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
      message.show(setInfoMessage, `Successfully logged as ${user.name}`);
    } catch (error) {
      const msg = error?.response?.data?.error ?? "Something went wrong";
      message.show(setErrorMessage, msg);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    loginService.clear();
    blogService.setToken("");
    setUser(null);
  };

  const messaging = {
    setErrorMessage,
    setInfoMessage,
  };

  return (
    <div className="App">
      {user && (
        <>
          <h3>Hello {user.name}</h3>
          <button onClick={handleLogout}>Log out</button>
          <BlogPage messaging={messaging}>
            {errorMessage && <ErrorDisplay message={errorMessage} />}
            {infoMessage && <InfoDisplay message={infoMessage} />}
          </BlogPage>
        </>
      )}

      {!user && (
        <LoginPage handleLogin={handleLogin}>
          {errorMessage && <ErrorDisplay message={errorMessage} />}
          {infoMessage && <InfoDisplay message={infoMessage} />}
        </LoginPage>
      )}
    </div>
  );
}

export default App;
