import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  // const loginUser = useSelector((state) => state.user)
  // const user = loginUser.lenght !== 0 ? loginUser[0] : null

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
  // const handleLogout = async (event) => {
  //   event.preventDefault()
  //   dispatch(logOut(user))
  //   navigate('/')
  // }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
