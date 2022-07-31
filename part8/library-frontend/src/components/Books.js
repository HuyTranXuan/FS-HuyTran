import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const result = useQuery(ALL_BOOKS) // eslint-disable-line
  const filterResult = useQuery(ALL_BOOKS, { variables: { genre } }) // eslint-disable-line
  useEffect(() => {}, [result.data])
  if (!props.show) {
    return null
  }
  if (result.loading || filterResult.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  const genres = books.map((b) => b.genres)
  const genresList = new Set()
  genres.map((g) => g.map((e) => genresList.add(e)))

  let b = genre === 'all' ? books : filterResult.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <h4>currently: {genre} genre</h4>

      <table>
        <tbody>
          <tr>
            <td key="{g}">
              <button onClick={() => setGenre('all')}>all genres</button>
            </td>
            {[...genresList].map((g) => (
              <td key={g}>
                <button onClick={() => setGenre(g)}>{g}</button>
              </td>
            ))}
          </tr>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {b
            // .filter((b) => (genre === 'all' ? b : b.genres.includes(genre)))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
