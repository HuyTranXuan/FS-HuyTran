import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = (u) => {
  let users = u.users
  if (users.length !== 0) {
    users = users.map((user) => ({
      userName: user.username,
      blogs: user.blogs.length,
      id: user.id,
    }))
  }
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <b>Username</b>
            </td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.length !== 0 ? (
            users
              .sort((a, b) => (Number(a.blogs) > Number(b.blogs) ? -1 : 1))
              .map((user) => (
                <tr key={user.userName}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.userName}</Link>
                  </td>
                  <td>{user.blogs}</td>
                </tr>
              ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
