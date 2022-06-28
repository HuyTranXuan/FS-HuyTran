/* eslint-disable linebreak-style */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { set } = require('../app')

let userID = '0'

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  userID = user.id

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('Testing blog api overall', () => {
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
      let token = await api.post(`/api/login/`).send({ username: 'root', password: 'sekret' })
      token = token.body.token

      const newBlog = {
        title: 'React awwww',
        author: 'Michael Chaner',
        url: 'https://reactpatterns.com/3',
        likes: 2,
        __v: 0
      }
    
      const response = await api.post('/api/blogs')
      .set({'Authorization': `bearer ${token}`})
      .send(newBlog).expect(201)
    
      expect(response.body.title).toEqual(newBlog.title)
    })
  
    test('likes property default is 0', async () => {
      let token = await api.post(`/api/login/`).send({ username: 'root', password: 'sekret' })
      token = token.body.token

      const newBlog = {
        title: 'React awwww',
        author: 'Michael Chaner',
        url: 'https://reactpatterns.com/3',
        __v: 0
      }
    
      const response = await api.post('/api/blogs')
      .set({'Authorization': `bearer ${token}`})
      .send(newBlog).expect(201)
      expect(response.body.likes).toEqual(0)
    })
    
    test('missing title and url responded with 400', async () => {
      let token = await api.post(`/api/login/`).send({ username: 'root', password: 'sekret' })
      token = token.body.token
      const newBlog = {    author: 'Michael Chaner'  }
      await api.post('/api/blogs')
      .set({'Authorization': `bearer ${token}`})
      .send(newBlog)
      .expect(400)
      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length)
    })
    test('adding a blog fails with the status code 401 Unauthorized if a token is not provided', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const newBlog = {
        title: 'React awwww',
        author: 'Michael Chaner',
        url: 'https://reactpatterns.com/3',
        likes: 2,
        __v: 0
      }
    
      await api.post('/api/blogs')
      .send(newBlog).expect(401)
        
      const blogsAtEnd = await helper.blogsInDb()  
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)  
      const title = blogsAtEnd.map(r => r.title)
      expect(title).not.toContain(newBlog.title)
    })
  })
  
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blog = {
        "title": "new blog test",
        "author": "Acva",
        "url": "https://reacasdtasdpatterns.com/33",
        "likes": 12
      }
      let token = await api.post(`/api/login/`).send({ username: 'root', password: 'sekret' })
      token = token.body.token
      let blogToDelete = await api.post(`/api/blogs/`).set({'Authorization': `bearer ${token}`}).send(blog)
      blogToDelete = blogToDelete.body      
      const blogsAtStart = await helper.blogsInDb()
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`).set({'Authorization': `bearer ${token}`})
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()  
      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )  
      const title = blogsAtEnd.map(r => r.title)
      expect(title).not.toContain(blogToDelete.title)
    })
    test('fail with status code 401 if wrong user or token', async () => {
      const blog = {
        "title": "new blog test",
        "author": "Acva",
        "url": "https://reacasdtasdpatterns.com/33",
        "likes": 12
      }
      let token = await api.post(`/api/login/`).send({ username: 'root', password: 'sekret' })
      token = token.body.token
      let blogToDelete = await api.post(`/api/blogs/`).set({'Authorization': `bearer ${token}`}).send(blog)
      blogToDelete = blogToDelete.body      
      const blogsAtStart = await helper.blogsInDb()
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`).set({'Authorization': `${token}`})
        .expect(401)
      const blogsAtEnd = await helper.blogsInDb()  
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)  
      const title = blogsAtEnd.map(r => r.title)
      expect(title).toContain(blogToDelete.title)
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
})

afterAll(() => {
  mongoose.connection.close()
})
