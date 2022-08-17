import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

import { Typography, Button, TextField } from '@material-ui/core'

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedValue, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const myStyle = { backgroundColor: '#f2511b', color: '#fff' }

  const [createBook] = useMutation(CREATE_BOOK)

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const published = parseInt(publishedValue)

    createBook({
      variables: {
        title,
        author,
        genres,
        published: Number(published),
      },
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
      update: (store, response) => {
        genres.forEach((genre) => {
          try {
            const dataInStore = store.readQuery({
              query: ALL_BOOKS,
              variables: { genre },
            })

            store.writeQuery({
              query: ALL_BOOKS,
              variables: { genre },
              data: {
                allBooks: [...dataInStore.allBooks].concat(
                  response.data.addBook
                ),
              },
            })
          } catch (e) {
            console.log('not queried', genre)
          }
        })
      },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }
  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
        Add new book
      </Typography>

      <form onSubmit={submit}>
        <div>
          <TextField
            required
            fullWidth
            variant="outlined"
            label="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            required
            fullWidth
            variant="outlined"
            label="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            required
            fullWidth
            variant="outlined"
            label="Published"
            type="number"
            value={publishedValue}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
        </div>
        <div>
          <Typography
            variant="body1"
            style={{ marginBottom: '0.5em', marginTop: '0.5em' }}
          >
            genres: {genres.join('-')}
          </Typography>

          <Button
            onClick={addGenre}
            variant="contained"
            type="button"
            style={{ marginRight: '1em' }}
          >
            add genre
          </Button>
          <Button variant="contained" type="submit" style={myStyle}>
            create book
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewBook
