const mongoose = require('mongoose')
const { model, Schema } = mongoose
const password = process.argv[2]
const connectstring = `mongodb+srv://ecomerce:${password}@cluster0.jg4iy.mongodb.net/phonebook?retryWrites=true&w=majority`

const PersonSchema = new Schema({
  name: String,
  number:String
})
const Person = model('Person', PersonSchema)

mongoose.connect(connectstring,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
  useCreateIndex:true
})

if(process.argv.length === 3){
  Person.find({})
    .then(persons => {
      console.log('Phonebook:')
      persons.map(item => {
        console.log(item.name,' ' ,item.number)
      })
      mongoose.connection.close()
    })

}else if(process.argv.length === 5){
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name:name,
    number:number
  })
  person.save()
    .then(savedPerson => {
      console.log('Person created', savedPerson)
      mongoose.connection.close()
    })

}
