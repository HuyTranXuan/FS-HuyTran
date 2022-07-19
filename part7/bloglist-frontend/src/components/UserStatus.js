import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserStatus = (u) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let user = u.user

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logOut(user))
    navigate('/')
  }
  return (
    <div>
      {user === null || user === undefined || user.user === null ? (
        <div>
          You are not loged in. <Link to="/login">Log in?</Link>
        </div>
      ) : (
        <div>
          {user.user.name} logged-in
          <button onClick={handleLogout}> log out </button>
        </div>
      )}
    </div>
  )
}
export default UserStatus
