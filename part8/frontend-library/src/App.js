import { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { Button, Container, ButtonGroup } from '@material-ui/core'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}
const App = () => {
  const result = useQuery(ALL_AUTHORS)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(
    localStorage.getItem('lib-user-token') || null
  )
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <Login setToken={setToken} setError={notify} />
      </>
    )
  }
  return (
    <div className="App">
      <Container>
        <div style={{ marginBottom: '0.75em' }}>
          <Notify errorMessage={errorMessage} />
          <ButtonGroup variant="outlined">
            <Button onClick={() => setPage('authors')}>authors</Button>
            <Button onClick={() => setPage('books')}>books</Button>
            <Button onClick={() => setPage('add')}>add book</Button>
            <Button onClick={() => setPage('recommend')}>recommend</Button>
            <Button onClick={logout}>logout</Button>
          </ButtonGroup>
        </div>
        <Authors show={page === 'authors'} setError={notify} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} setError={notify} />
        <Recommend show={page === 'recommend'} />
      </Container>
    </div>
  )
}

export default App
