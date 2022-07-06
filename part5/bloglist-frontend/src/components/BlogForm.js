import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:{' '}
          <input
            value={newTitle}
            id="title"
            onChange={handleTitleChange}
            placeholder="write here blog title"
          />
        </div>
        <div>
          Author:{' '}
          <input
            value={newAuthor}
            id="author"
            onChange={handleAuthorChange}
            placeholder="write here blog author"
          />
        </div>
        <div>
          Url:{' '}
          <input
            value={newUrl}
            id="url"
            onChange={handleUrlChange}
            placeholder="write here blog url"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
