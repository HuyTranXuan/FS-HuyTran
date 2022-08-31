import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    initializeWith(state, { payload }) {
      return payload
    },
    updateBlog(state, action) {
      const blogToChange = action.payload
      return state.map((blog) =>
        blog.id === blogToChange.id ? blogToChange : blog
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const target = action.payload
      return state.filter((blog) => blog.id !== target.id)
    },
  },
})
export const initializeBlogs = () => {
  return async (dispatch) => {
    blogsService.getAll().then((response) => {
      dispatch(initializeWith(response))
    })
  }
}
export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(content)
    dispatch(appendBlog(newBlog))
  }
}
export const like = (content) => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    const blogToChange = blogs.find((n) => n.id === content)
    const changedBlog = {
      user: blogToChange.user.id,
      likes: Number(blogToChange.likes) + 1,
      author: blogToChange.author,
      title: blogToChange.title,
      url: blogToChange.url,
    }
    const response = await blogsService.update(content, changedBlog)
    dispatch(updateBlog(response))
  }
}
export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    const blogToChange = blogs.find((n) => n.id === blogId)

    const comments = blogToChange.comments
      ? blogToChange.comments.concat(comment.value)
      : [comment.value]

    const changedBlog = {
      user: blogToChange.user.id,
      likes: blogToChange.likes,
      author: blogToChange.author,
      title: blogToChange.title,
      url: blogToChange.url,
      comments: comments,
    }
    const response = await blogsService.addComment(blogId, changedBlog)
    dispatch(updateBlog(response))
  }
}
export const remove = (content) => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    const blogToRemove = blogs.find((n) => n.id === content)
    await blogsService.deleteBlog(content)
    dispatch(removeBlog(blogToRemove))
  }
}

export const { initializeWith, appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
