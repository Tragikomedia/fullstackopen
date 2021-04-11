import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BOOKS_BY_GENRE } from "../data/books/query";
import { GET_USER } from "../data/user/query";
import BookTable from "./BookTable";

const Recommended = ({ show }) => {
  const userData = useQuery(GET_USER);
  const [getBooks, booksData] = useLazyQuery(BOOKS_BY_GENRE);
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const favoriteGenre = userData.data?.me?.favoriteGenre;
    if (favoriteGenre) {
      setFavoriteGenre(favoriteGenre);
    }
  }, [userData.data, getBooks]);

  useEffect(() => {
    getBooks({
      variables: {
        genre: favoriteGenre,
      },
    });
  }, [favoriteGenre, getBooks]);

  useEffect(() => {
    const queriedBooks = booksData.data?.allBooks;
    if (queriedBooks) {
      setBooks(queriedBooks);
    }
  }, [booksData.data]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h3>Books recommended to you</h3>
      <p>in your favorite genre: {favoriteGenre}</p>
      <BookTable books={books} />
    </div>
  );
};

export default Recommended;
