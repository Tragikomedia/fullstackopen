import React from "react";

const GenreFilter = ({ genres, setFilter }) => {
  return (
    <>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "row" }}>
        <li key={"all"}>
          <button onClick={() => setFilter("")}>all</button>
        </li>
        {genres.map((genre) => (
          <li key={genre}>
            <button onClick={() => setFilter(genre)}>{genre}</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GenreFilter;
