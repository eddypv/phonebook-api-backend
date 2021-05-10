const { json, response } = require('express')
const express = require('express')
const app = express()
app.use(json())
let persons = [
    {
    "name": "Arto Hellas",
    "number": "123123",
    "id": 1
    },
    {
    "name": "Dan Abramov",
    "number": "123123",
    "id": 2
    },
    {
    "name": "Juan Pablo",
    "number": "1234664",
    "id": 3
    }
]

app.get("/api/persons/info", (request, response)=>{
    const info = `<p>Phonebook has info for ${persons.length} persons </p>
    <p>${new Date()}</p>`
    response.send(info)
})
app.get("/api/persons", (request, response)=>{

    response.json(persons)
})

app.get("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id)
    const person = persons.find(item => item.id === id )
    if(typeof person === 'undefined' )
        response.status(404).end()
    else 
        response.json(person)

})

app.delete("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(item => item.id !== id )
    response.status(204).end()

})

app.post("/api/persons", (request, response)=>{
    const newPerson = request.body
    let messageError = ""
    if (typeof newPerson.name === "undefined" || typeof newPerson.number === "undefined")
        messageError = "The name or number is missing"
    else if(newPerson.name.trim() === "")
        messageError = "name is required"
    else if ( newPerson.number.trim() === "")
        messageError = "number is required"
    else{
        const existsPerson = persons.find(item => item.name === newPerson.name.trim() )
        if(typeof existsPerson !== "undefined") 
            messageError = "name must be unique"
    }

    if(messageError === ""){
        const ids = persons.map(item => item.id)
        const maxId = Math.max(...ids)
        newPerson.id = maxId +1
        persons = persons.concat(newPerson)
        response.status(201).json(newPerson)
    }else 
        response.status(400).json({"error":messageError})

})
const PORT=3001
app.listen(PORT, ()=>{
    console.log(`listennig by http://localhost:${PORT}`)
})