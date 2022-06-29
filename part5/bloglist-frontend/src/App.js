import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()    
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong ..something..')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }
  const handleTitleChange = (event) => { setNewTitle(event.target.value) }
  const handleAuthorChange = (event) => { setNewAuthor(event.target.value) }
  const handleUrlChange = (event) => { setNewUrl(event.target.value) }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>Title: <input value={newTitle} onChange={handleTitleChange} /></div>
      <div>Author: <input value={newAuthor} onChange={handleAuthorChange} /></div>
      <div>Url: <input value={newUrl} onChange={handleUrlChange} /></div> 
      <button type="submit">create</button>
    </form>  
  )
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try{
      blogService
      .create(blogObject)
      .then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})
           
      setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setErrorMessage('Missing fields')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }    
  }
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {user === null ?
      loginForm() :
      <div>
        <div>{user.name} logged-in <button onClick={handleLogout}> log out </button></div>
        {blogForm()}
      </div>
    }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
