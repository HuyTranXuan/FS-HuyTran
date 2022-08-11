import { useQuery } from '@apollo/client'
import { ALL_BOOKS, MY_BOOKS } from '../queries'
import { Typography } from '@material-ui/core'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core'

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
      <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
        Recommendations
      </Typography>

      <Typography variant="h6" style={{ marginBottom: '0.5em' }}>
        Books in your favorite genre:
        <b style={{ color: '#f2511b', marginLeft: '0.25em' }}>{myGenres}</b>
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Title</b>
            </TableCell>
            <TableCell>
              <b>Author</b>
            </TableCell>
            <TableCell>
              <b>Published</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books
            .filter((b) =>
              myGenres === 'all' ? b : b.genres.includes(myGenres)
            )
            .map((a) => (
              <TableRow key={a.title}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.author.name}</TableCell>
                <TableCell>{a.published}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Recommend
