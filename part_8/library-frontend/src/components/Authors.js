import { ALL_AUTHORS } from '../data/authors/query';
import { useQuery } from '@apollo/client'
import React from 'react'

const Authors = (props) => {
  const {loading, data, error} = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null
  }
  if (loading) return <div>...loading</div>
  if (error) return <div>Error: {error}</div>

  const authors = data?.allAuthors ?? [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors