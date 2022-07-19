import { initializeBlogs } from './reducers/blogReducer'
import { getAll } from './reducers/usersReducer'
//F R O M   C O M P O N E N T S
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserStatus from './components/UserStatus'
import Users from './components/Users'
import User from './components/User'
//F R O M   L I B R A R I E S
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  let blogs = useSelector((state) => state.blogs)
  let user = useSelector((state) => state.user)
  let users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])
  useEffect(() => {
    dispatch(getAll())
  }, [users])
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const matchUser = useMatch('/users/:id')
  const userTargeted = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null
  return (
    <div className="container">
      <Menu />
      <UserStatus user={user} />
      <Notification />
      <Routes>
        {userTargeted === null ? null : (
          <Route path="/users/:id" element={<User user={userTargeted} />} />
        )}
        {blog === undefined ? (
          <Route path="/" element={<BlogList />} />
        ) : (
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        )}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App

/**
  //F R O M   S E R V I C E
  import blogService from './services/blogs'
  import loginService from './services/login'
  import Togglable from './components/Togglable'

  const [blogs, setBlogs] = useState([])
    useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const addLike = (blogObject) => {
    const updatedBlog = {
      user: blogObject.user.id,
      likes: Number(blogObject.likes) + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
    }
    blogService.update(blogObject.id, updatedBlog)
  }
  const deleteBlog = (blogObject) => {
    if (blogObject.user.username.toString() === user.username.toString()) {
      if (
        window.confirm(
          `Remove blog ${blogObject.title} by ${blogObject.author}`
        )
      )
        blogService.deleteBlog(blogObject.id)
    }
  }

          {blogs
          .sort((a, b) => (Number(a.likes) > Number(b.likes) ? -1 : 1))
          .map((blog) => (
            <div style={blogStyle} key={blog.id}>
              {blog.title}{' '}
              <Togglable buttonLabel="view">
                <Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
              </Togglable>
            </div>
          ))}
          <Togglable buttonLabel="login">

        </Togglable>
 */
