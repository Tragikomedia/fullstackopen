import { useApolloClient, useLazyQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoggedInfo from "./components/Login/LoggedInfo";
import LoginForm from "./components/Login/LoginForm";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";
import { ALL_BOOKS } from "./data/books/query";
import { BOOK_ADDED } from "./data/books/subscription";
import { GET_USER } from "./data/user/query";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [getUser, userData] = useLazyQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });
  const client = useApolloClient();

  useEffect(() => {
    getUser();
  }, [token, getUser]);

  const updateCacheWith = (addedObject) => {
    const includedIn = (set, object) =>
      set.map((el) => el.id).includes(object.id);
    const dataStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataStore.allBooks, addedObject)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataStore.allBooks.concat(addedObject),
        },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      updateCacheWith(book);
      window.alert(`Book ${book.title} added`);
    },
  });

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
        {token && (
          <button onClick={() => setPage("recommended")}>recommended</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      {token && userData.data?.me?.username && (
        <NewBook show={page === "add"} />
      )}
      <Recommended show={page === "recommended"} />
    </div>
  );
};

export default App;
