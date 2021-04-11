import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { LOGIN } from "../../data/user/mutation";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("token", token);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        username,
        password,
      },
    });
    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
