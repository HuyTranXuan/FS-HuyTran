/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

/*############################
C R E A T E   N E W   U S E R
############################*/
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  //username and password must be given
  if (typeof(username)=== 'undefined' || typeof(password)=== 'undefined'){
    return response.status(400).json({ error: 'content missing' })
  }
  //username and password must be at least 3 characters long
  if (username.toString().length < 3 || password.toString().length < 3){
    return response.status(400).json({ error: 'username and password must be at least 3 characters long' })
  }  
  //username and password must be given
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    name,
    passwordHash,
  })
  
  const savedUser = await user.save()
  
  response.status(201).json(savedUser)
})

/*#######################
G E T   A L L   U S E R S
########################*/
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { content: 1, date: 1 })
  
  response.json(users)
})


module.exports = usersRouter