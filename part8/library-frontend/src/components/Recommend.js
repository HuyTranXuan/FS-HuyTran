import { useQuery } from '@apollo/client'
import { ALL_BOOKS, MY_BOOKS } from '../queries'

const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS) // eslint-disable-line
  const resultGenres = useQuery(MY_BOOKS) // eslint-disable-line
  if (!props.show) {
    return null
  }
  if (result.loading || resultGenres.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  const myGenres = resultGenres.data.me.favouriteGenre
  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{myGenres}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) =>
              myGenres === 'all' ? b : b.genres.includes(myGenres)
            )
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

export default Recommend
