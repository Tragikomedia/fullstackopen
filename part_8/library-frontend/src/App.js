import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoggedInfo from "./components/Login/LoggedInfo";
import LoginForm from "./components/Login/LoginForm";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";
import { GET_USER } from "./data/user/query";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [getUser, userData] = useLazyQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getUser();
  }, [token, getUser]);

  return (
    <div>
      {!(token && userData.data?.me?.username) ? (
        <LoginForm setToken={setToken} />
      ) : (
        <LoggedInfo setToken={setToken} />
      )}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommended")}>recommended</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      {token && userData.data?.me?.username && (
        <NewBook show={page === "add"} />
      )}
      <Recommended show={page === "recommended"}/>
    </div>
  );
};

export default App;
