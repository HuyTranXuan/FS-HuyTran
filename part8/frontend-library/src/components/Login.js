import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { Typography, Button, TextField } from '@material-ui/core'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('lib-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  const myStyle = { backgroundColor: '#f2511b', color: '#fff' }
  return (
    <div
      style={{ width: '50%', position: 'absolute', top: '25%', left: '25%' }}
    >
      <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
        Login
      </Typography>
      <form onSubmit={submit}>
        <div>
          <TextField
            required
            fullWidth
            size="small"
            variant="outlined"
            label="Username"
            style={{ marginBottom: '1em' }}
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            required
            fullWidth
            size="small"
            variant="outlined"
            label="Password"
            style={{ marginBottom: '1em' }}
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <Typography variant="body1" style={{ marginBottom: '0.5em' }}>
          *Guest can login by using Username: huy, Password: secret
        </Typography>
        <Button variant="contained" type="submit" style={myStyle}>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
