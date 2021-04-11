import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoggedInfo from "./components/Login/LoggedInfo";
import LoginForm from "./components/Login/LoginForm";
import NewBook from "./components/NewBook";
import { GET_USER } from "./data/user/query";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);
  const userData = useQuery(GET_USER, {
    onError: (error) => {
      localStorage.clear();
      setToken(null);
    }
  });

  return (
    <div>
      {!(token && userData.data?.me?.username) ? <LoginForm setToken={setToken} /> : <LoggedInfo setToken={setToken}/>}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      {token && userData.data?.me?.username && <NewBook show={page === "add"} />}
    </div>
  );
};

export default App;
