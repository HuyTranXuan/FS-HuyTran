const Blog = ({ blog, addLike, deleteBlog }) => {
  return (
    <div className="blogElement">
      <p className="urlElement">{blog.url}</p>
      <form className="likeElement" onSubmit={() => addLike(blog)}>
        likes {blog.likes}
        <button type="submit">like</button>
      </form>
      <p>{blog.author}</p>
      <form onSubmit={() => deleteBlog(blog)}>
        <button type="submit">remove</button>
      </form>
    </div>
  )
}

export default Blog
