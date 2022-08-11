import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'
import { Typography, Button, ButtonGroup } from '@material-ui/core'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core'

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
  const myStyle = { backgroundColor: '#fde4dc', color: '#000' }
  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
        Books
      </Typography>
      <Typography variant="h6" style={{ marginBottom: '0.5em' }}>
        Currently: <b style={{ color: '#f2511b' }}>{genre}</b> genre
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="{g}">
              <Button
                variant="contained"
                style={myStyle}
                onClick={() => setGenre('all')}
              >
                all genres
              </Button>
            </TableCell>
            {[...genresList].map((g) => (
              <TableCell key={g}>
                <Button
                  variant="contained"
                  style={myStyle}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </Button>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
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
          {b
            // .filter((b) => (genre === 'all' ? b : b.genres.includes(genre)))
            .map((a) => (
              <TableRow key={a.title + a.author.name}>
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

export default Books
