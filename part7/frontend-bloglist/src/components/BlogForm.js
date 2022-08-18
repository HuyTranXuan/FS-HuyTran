import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, Table } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const BlogForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user) {
      dispatch(
        createBlog({
          title: title.value,
          author: author.value,
          url: url.value,
          likes: 0,
        })
      )
      navigate('/')
      dispatch(setNotification(`a new blog ${title.value} created!`, 5))
    } else {
      dispatch(setNotification('only logged in users can create a new blog', 5))
    }
  }
  const handleReset = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }
  return (
    <div>
      <h2>Create a new blog</h2>
      <Form>
        <Table striped>
          <tbody>
            <tr>
              <td>
                <b>Title</b>
              </td>
              <td>
                <input {...title} />
              </td>
            </tr>
            <tr>
              <td>
                <b>Author</b>
              </td>
              <td>
                <input {...author} />
              </td>
            </tr>
            <tr>
              <td>
                <b>Url</b>
              </td>
              <td>
                <input {...url} />
              </td>
            </tr>
            <tr>
              <td>
                <Button onClick={handleSubmit}>Create</Button>
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
export default BlogForm
