import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blogs = () => {
  let blogs = useSelector((state) => state.blogs)
  blogs = [...blogs]
  return (
    <div>
      <h2>Blogs</h2>
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
              <b>Likes</b>
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
  )
}
export default Blogs

/**
import { like } from '../reducers/blogReducer'useDispatch,
import { setNotification } from '../reducers/notificationReducer'

  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const searchQuerry = filter.searchQuerry


            .filter((a) =>
              a.content.toLowerCase().includes(searchQuerry.toLowerCase()))
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={() => {
                  dispatch(like(blog.id))
                  dispatch(setNotification(`you liked '${blog.title}'`, 5))
                }}
                deleteBlog={() => {
                  dispatch(like(blog.id))
                  dispatch(setNotification(`you liked '${blog.title}'`, 5))
                }}
              />
            )
 */
