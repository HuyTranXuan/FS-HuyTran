import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  let allBlogs = useSelector((state) => state.blogs)
  const userBlogs = user.blogs.map((b) => b.id)
  let blogs = []
  if (userBlogs.length !== 0 && allBlogs.length !== 0) {
    allBlogs.map((blog) => {
      if (userBlogs.includes(blog.id)) blogs.push(blog)
    })
  }
  return (
    <div>
      <h2>Username: {user.username}</h2>
      {blogs.length === 0 ? (
        <h4>this user does not have any blog at the moment</h4>
      ) : (
        <div>
          <h4>added blogs</h4>
          <Table striped>
            <tbody>
              <tr>
                <td>
                  <b>Title</b>
                </td>
                <td>
                  <b>Author</b>
                </td>
                <td>
                  <b>Url</b>
                </td>
              </tr>
              {blogs
                .sort((a, b) => (Number(a.likes) > Number(b.likes) ? -1 : 1))
                .map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                    <td>{blog.author}</td>
                    <td>{blog.likes}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default User
