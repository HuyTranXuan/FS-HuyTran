/* eslint-disable linebreak-style */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('general blog test', () => {
  test('blog list to have correct length', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('blog have unique identifier property named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('adding new blog with valid data', async () => {
    const newBlog = {
      title: 'React awwww',
      author: 'Michael Chaner',
      url: 'https://reactpatterns.com/3',
      likes: 2,
      __v: 0
    }
  
    const response = await api.post('/api/blogs').send(newBlog).expect(201)
  
    expect(response.body.title).toEqual(newBlog.title)
  })

  test('likes property default is 0', async () => {
    const newBlog = {
      title: 'React awwww',
      author: 'Michael Chaner',
      url: 'https://reactpatterns.com/3',
      __v: 0
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toEqual(0)
  })
  
  test('missing title and url responded with 400', async () => {
    const newBlog = {    author: 'Michael Chaner'  }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)
    expect(title).not.toContain(blogToDelete.title)
  })
})
test('update likes', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const newBlog = { likes: 1 }
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
  const blogs = await helper.blogsInDb()
  expect(blogs[0].likes).toEqual(newBlog.likes)
})
afterAll(() => {
  mongoose.connection.close()
})
