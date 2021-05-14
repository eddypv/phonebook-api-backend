require('dotenv').config()
const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { errorHandler } = require('./errors')
const app = express()
app.use(cors())
app.use(json())
// files statics
app.use(express.static('build'))

morgan.token('Body', (req, res) => {
  const body = req.body
  if (Object.keys(body).length > 0) { return JSON.stringify(body) } else { return '' }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :Body'))

app.get('/api/persons/info', (request, response) => {

  Person.find({})
    .then(persons => {
      const info = `<p>Phonebook has info for ${persons.length} persons </p> <p>${new Date()}</p>`
      response.send(info)
    })

})
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })

})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if(person)
        response.json(person)
      else
        response.status(404).end()
    })
    .catch(error => { next(error) })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const newPerson = request.body
  console.log(newPerson)
  Person.findByIdAndUpdate(id, newPerson, { new:true })
    .then(person => {
      if(person)
        response.json(person)
      else
        response.status(404).end()
    })
    .catch(error => { next(error) })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => { next(error) })
})

app.post('/api/persons', (request, response, next) => {
  const newPerson = request.body
  const person = new Person({ ...newPerson })
  person.save()
    .then(savedPerson => {
      response.status(201).json(savedPerson)
    })
    .catch(error => { next(error)})

})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`listennig by http://localhost:${PORT}`)
})