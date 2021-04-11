import { useApolloClient, useQuery } from "@apollo/client";
import { GET_USER } from "../../data/user/query";
import React from "react";

const LoggedInfo = ({ setToken }) => {
  const result = useQuery(GET_USER);
  const client = useApolloClient();
  const username = result.data?.me?.username;

  if (!username) return null;

  const logout = () => {
    setToken(null);
    localStorage.setItem("token", null);
    client.resetStore();
  };

  return <div>Hello {username}! <button onClick={logout}>Log out</button></div>;
};

export default LoggedInfo;
