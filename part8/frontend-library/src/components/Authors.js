import * as React from 'react'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ADD_YEAR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import {
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core'
const myStyle = { backgroundColor: '#f2511b', color: '#fff' }
const SetBirthYear = ({ authors, setError }) => {
  const [authorBorn, setAuthorBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  const [addYear] = useMutation(ADD_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    const setBornTo = parseInt(authorBorn)
    if (
      isNaN(setBornTo) ||
      setBornTo < 0 ||
      setBornTo > new Date().getFullYear()
    ) {
      setError('Invalid author born year')
    } else {
      addYear({
        variables: {
          name: selectedOption,
          setBornTo,
        },
      })
      setAuthorBorn('')
    }
  }

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '0.5em' }}>
        Set BirthYear
      </Typography>
      <form onSubmit={submit} style={{ marginBottom: '0.5em' }}>
        <Grid>
          <Grid item>
            <TextField
              select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              helperText="Please select author name to set birthyear"
            >
              {authors.map((e) => (
                <MenuItem key={e.name} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item>
            <Typography style={{ marginTop: '0.5em' }} variant="body1">
              Born
            </Typography>
          </Grid> */}
          <Grid item>
            <TextField
              variant="outlined"
              label="year"
              style={{ margin: '0.5em', marginLeft: 0 }}
              size="small"
              type="number"
              value={authorBorn}
              onChange={({ target }) => setAuthorBorn(target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" style={myStyle} type="submit">
              update author
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
const Authors = ({ show, setError }) => {
  if (!show) {
    return null
  }
  const result = useQuery(ALL_AUTHORS) // eslint-disable-line

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  return (
    <div>
      <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
        Authors
      </Typography>
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Born</b>
            </TableCell>
            <TableCell>
              <b>Books</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((a) => (
            <TableRow key={a.name}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.born}</TableCell>
              <TableCell>{a.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <div>
        <SetBirthYear authors={authors} setError={setError} />
      </div>
    </div>
  )
}

export default Authors
