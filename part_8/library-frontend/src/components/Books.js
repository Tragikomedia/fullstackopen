import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../data/books/query";
import React, { useEffect, useState } from "react";
import GenreFilter from "./GenreFilter";

const Books = (props) => {
  const { loading, data, error } = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (data?.allBooks) {
      setBooks(data.allBooks);
    }
  }, [setBooks, data]);

  if (!props.show) {
    return null;
  }
  if (loading) return <div>...loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  const genres = Array.from(
    new Set(books.reduce((a, b) => [...a, ...b.genres], []))
  );
  const genre = filter ? filter : 'all genres';
  const booksToShow = filter
    ? books.filter((book) => book.genres.includes(filter))
    : books;

  return (
    <div>
      <h2>books</h2>
      <p>books in {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenreFilter setFilter={setFilter} genres={genres} />
    </div>
  );
};

export default Books;
