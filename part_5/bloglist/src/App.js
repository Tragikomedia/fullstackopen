import { useState} from "react";
import InfoDisplay from "./components/InfoDisplay";
import ErrorDisplay from "./components/ErrorDisplay";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginPage from "./components/LoginPage";
import BlogPage from "./components/BlogPage";

function App() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      setInfoMessage(`Successfully logged as ${user.name}`);
      setTimeout(() => setInfoMessage(""), 5000);
    } catch (error) {
      const message = error?.response?.data?.error;
      setErrorMessage(message ?? "Something went wrong");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="App">
      {user && <h3>Hello {user.name}</h3>}
      {user && (
        <BlogPage>
          {errorMessage && <ErrorDisplay message={errorMessage} />}
          {infoMessage && <InfoDisplay message={infoMessage} />}
        </BlogPage>
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
