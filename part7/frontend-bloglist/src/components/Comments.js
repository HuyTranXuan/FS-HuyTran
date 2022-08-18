// import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addComment } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const { reset: resetComment, ...comment } = useField('text')
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()
  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))

    dispatch(setNotification(`you commented on '${blog.title}'`, 5))
    resetComment()
  }
  return (
    <div>
      <h2>Comments:</h2>
      <Form>
        <div>
          <input {...comment} />
        </div>
        <br />
        <Button onClick={handleComment}>add comment</Button>
      </Form>
      <ul>
        <br />
        {blog.comments ? blog.comments.map((c) => <li key={c}>{c}</li>) : null}
      </ul>
    </div>
  )
}

export default Comments
