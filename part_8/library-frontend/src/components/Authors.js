import { ALL_AUTHORS } from "../data/authors/query";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import SetAuthorBirthYear from "./SetAuthorBirthYear";

const Authors = (props) => {
  const { loading, data, error } = useQuery(ALL_AUTHORS);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    if (data?.allAuthors)
    setAuthors(data.allAuthors);
  }, [setAuthors, data]);

  if (!props.show) {
    return null;
  }
  if (loading) return <div>...loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetAuthorBirthYear />
    </div>
  );
};

export default Authors;
