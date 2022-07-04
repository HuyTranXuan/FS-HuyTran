const Blog = ({ blog, addLike, deleteBlog }) => {
	return (
		<div className="blogElement">
			<p>{blog.url}</p>
			<form onSubmit={() => addLike(blog)}>
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
