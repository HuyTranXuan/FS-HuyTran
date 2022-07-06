const Blog = ({ blog, addLike, deleteBlog }) => {
  return (
    <div className="blogElement">
      <p className="urlElement">{blog.url}</p>
      <form className="likeElement" onSubmit={() => addLike(blog)}>
        likes {blog.likes}
        <button id="like-button" type="submit">
          like
        </button>
      </form>
      <p>{blog.author}</p>
      <form onSubmit={() => deleteBlog(blog)}>
        <button id="remove-button" type="submit">
          remove
        </button>
      </form>
    </div>
  )
}

export default Blog
