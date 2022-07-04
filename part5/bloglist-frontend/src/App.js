import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	// const [loginVisible, setLoginVisible] = useState(false)

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
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
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
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
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}
	const addBlog = (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			blogService.create(blogObject).then((returnedBlog) => {
				setBlogs(blogs.concat(returnedBlog))
			})
			setErrorMessage(
				`a new blog ${blogObject.title} by ${blogObject.author} added`
			)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		} catch (exception) {
			setErrorMessage('Missing fields')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}
	const blogFormRef = useRef()

	const blogForm = () => (
		<Togglable buttonLabel="create new blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}
	const addLike = (blogObject) => {
		const updatedBlog = {
			user: blogObject.user.id,
			likes: Number(blogObject.likes) + 1,
			author: blogObject.author,
			title: blogObject.title,
			url: blogObject.url,
		}
		blogService.update(blogObject.id, updatedBlog)
		setErrorMessage(`you have like ${blogObject.title} by ${blogObject.author}`)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}
	const deleteBlog = (blogObject) => {
		if (blogObject.user.username.toString() === user.username.toString()) {
			try {
				if (
					window.confirm(
						`Remove blog ${blogObject.title} by ${blogObject.author}`
					)
				)
					blogService.deleteBlog(blogObject.id)
				setErrorMessage(
					`you have delete ${blogObject.title} by ${blogObject.author}`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			} catch (exception) {
				setErrorMessage(`Error: ${exception}`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			}
		}
	}
	return (
		<div>
			<h2>Blogs</h2>

			<Notification message={errorMessage} />

			{user === null ? (
				<Togglable buttonLabel="login">
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
				</Togglable>
			) : (
				<div>
					<div>
						{user.name} logged-in{' '}
						<button onClick={handleLogout}> log out </button>
					</div>
					{blogForm()}
				</div>
			)}

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
		</div>
	)
}

export default App
