import { setNotification } from '../reducers/notificationReducer'
import { like, remove } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(like(blog.id))

    dispatch(setNotification(`you liked '${blog.title}'`, 5))
    navigate('/')
  }
  const handleRemove = (event) => {
    event.preventDefault()
    if (user && user.user.username === blog.user.username) {
      dispatch(remove(blog.id))
      dispatch(setNotification(`you removed '${blog.title}'`, 5))
    } else
      dispatch(setNotification(`only the owner can remove '${blog.title}'`, 5))
    navigate('/')
  }

  return (
    <div className="blogElement">
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
          <tr>
            <td>
              <p className="titleElement">{blog.title}</p>
            </td>
            <td>
              <p className="authorElement">{blog.author}</p>
            </td>
            <td>
              <p className="urlElement">{blog.url}</p>
            </td>
          </tr>
        </tbody>
      </Table>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <b>Likes:</b> {blog.likes}
            </td>
            <td>
              <form className="likeElement" onSubmit={handleLike}>
                <Button id="like-button" type="submit">
                  like
                </Button>
              </form>
            </td>
            <td>
              <form className="removeElement" onSubmit={handleRemove}>
                <Button id="remove-button" type="submit">
                  remove
                </Button>
              </form>
            </td>
          </tr>
        </tbody>
      </Table>
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
