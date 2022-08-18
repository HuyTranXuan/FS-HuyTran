import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

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
    <div style={{ paddingTop: '1em' }}>
      {user === null || user === undefined || user.user === null ? (
        <div>
          You are not loged in. <Link to="/login">Log in?</Link>
        </div>
      ) : (
        <div>
          {user.user.name} logged-in
          <Button
            variant="outline-dark"
            style={{ marginLeft: '.5em' }}
            onClick={handleLogout}
          >
            log out
          </Button>
        </div>
      )}
    </div>
  )
}
export default UserStatus
