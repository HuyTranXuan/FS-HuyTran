import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

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
      <h2>create a new blog</h2>
      <Form>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <Button onClick={handleSubmit}>create</Button>
        <Button onClick={handleReset}>reset</Button>
      </Form>
    </div>
  )
}
export default BlogForm
