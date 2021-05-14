const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { model, Schema } = mongoose
const URL = process.env.MONGO_URI

const PersonSchema = new Schema({
  name: { type:String, required:true, unique:true, minLength:3 },
  number:{ type:String, required:true }
})
PersonSchema.set('toJSON',{
  transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
PersonSchema.plugin(uniqueValidator)
mongoose.connect(URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
  useCreateIndex:true
})
  .then(() => {
    console.log('Connected to Mongo DB')
  })
  .catch(err => {
    console.log('Error connecting to Mongo DB ', err.message)
  })
module.exports = model('Person', PersonSchema)

