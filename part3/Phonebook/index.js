if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
//app.use(morgan("tiny"));
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join(' ')
  )
)
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

// const generateId = () => {
// 	const getRandomInt = Math.floor(Math.random() * 10000);
// 	while (persons.find((p) => p.id === getRandomInt)) {
// 		getRandomInt = Math.floor(Math.random() * 10000);
// 	}
// 	return getRandomInt;
// };

// app.get("/api/persons/:id", (request, response) => {
// 	const id = Number(request.params.id);
// 	const person = persons.find((person) => person.id === id);
// 	if (person) {
// 		response.json(person);
// 	} else {
// 		response.status(404).end();
// 	}
// });

// app.get("/info", (request, response) => {
// 	response.send(
// 		`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
// 	);
// });

// app.delete("/api/persons/:id", (request, response) => {
// 	const id = Number(request.params.id);
// 	persons = persons.filter((person) => person.id !== id);
// 	response.status(204).end();
// });

// app.post("/api/persons", (request, response) => {
// 	const body = request.body;
// 	if (!body.number || !body.name) {
// 		return response.status(400).json({
// 			error: "The name or number is missing",
// 		});
// 	}
// 	if (persons.find((p) => p.name === body.name)) {
// 		return response.status(400).json({
// 			error: "The name already exists in the phonebook",
// 		});
// 	}
// 	const person = {
// 		name: body.name,
// 		number: body.number,
// 		id: generateId(),
// 	};
// 	persons = persons.concat(person);
// 	response.json(person);
// });
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body.number === undefined || body.name === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => {
      next(error)
      //return response.status(400).json({ error: error.message });
    })
})
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})
app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date()}</p>`
    )
  })
})
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
