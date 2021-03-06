import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { EDIT_AUTHOR } from "../data/authors/mutation";
import { ALL_AUTHORS } from "../data/authors/query";
import { GET_USER } from "../data/user/query";
import React from "react";

const SetAuthorBirthYear = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const { data } = useQuery(ALL_AUTHORS);
  const [editBirthYear] = useMutation(EDIT_AUTHOR, {
    update: (store, response) => {
      const changed = response.data.editAuthor;
      const dataInStore = store.readQuery({ query: ALL_AUTHORS });
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: dataInStore.allAuthors.map((data) =>
            data.id === changed.id ? changed : data
          ),
        },
      });
    },
  });

  const userResult = useQuery(GET_USER);

  if (!userResult.data?.me?.username) return null;

  const authors = data?.allAuthors ?? [];

  const onSubmit = (e) => {
    e.preventDefault();
    editBirthYear({
      variables: {
        name,
        year: Number(year),
      },
    });
    setName("");
    setYear("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={onSubmit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Year{" "}
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">Set year</button>
      </form>
    </div>
  );
};

export default SetAuthorBirthYear;
