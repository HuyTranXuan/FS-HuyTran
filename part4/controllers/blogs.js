const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  console.log(blogs)
  response.json(blogs)
})

// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (typeof(body.title)=== 'undefined' && typeof(body.url)=== 'undefined'){
    return response.status(400).json({ error: 'content missing' })
  }
  const blog = new Blog(  {
    _id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    __v: body.__v
  }  )
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

// blogsRouter.delete('/:id', (request, response) => {
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204)
//     })
// })

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response,next) => {
  const body = request.body
  await Blog.findByIdAndUpdate(request.params.id,body,{new: true})
  try {
    response.status(200).json(body)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter