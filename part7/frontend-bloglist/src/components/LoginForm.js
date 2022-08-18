import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

import { Form, Button, Table } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(
      logIn({
        username: username.value,
        password: password.value,
      })
    )
    resetUsername()
    resetPassword()
    navigate('/')
  }
  const handleReset = () => {
    resetUsername()
    resetPassword()
  }
  return (
    <div>
      <h2>Login</h2>

      <Form>
        <Table striped>
          <tbody>
            <tr>
              <td>
                <b>Username</b>
              </td>
              <td>
                <input {...username} />
              </td>
            </tr>
            <tr>
              <td>
                <b>Password</b>
              </td>
              <td>
                <input {...password} />
              </td>
            </tr>
            <tr>
              <td>
                <Button id="login-button" type="submit" onClick={handleLogin}>
                  Login
                </Button>
              </td>
              <td>
                <Button onClick={handleReset}>Reset</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </div>
  )
}

export default LoginForm
