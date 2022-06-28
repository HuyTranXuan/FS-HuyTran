const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require('../utils/middleware')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')

//refactor into tokenExtractor middleware
// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/',userExtractor, async (request, response, next) => {
  const body = request.body
  // const token = getTokenFrom(request)

  //for 4.17: assign first user as author for new blog
  // const users = await User.find({})
  // const user = users[0]
  
  //for 4.22: refactor into userExtractor middleware
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  const user = request.user

  if (typeof(body.title)=== 'undefined' && typeof(body.url)=== 'undefined'){
    return response.status(400).json({ error: 'content missing' })
  }
  const blog = new Blog(  {
    _id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    __v: body.__v,
    user: user._id
  }  )
  try {
    const savedBlog = await blog.save()   
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id',userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString())  {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else  return response.status(401).json({ error: 'token missing or invalid' })

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