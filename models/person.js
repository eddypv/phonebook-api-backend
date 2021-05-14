const mongoose = require('mongoose')
const {model, Schema } = mongoose
const URL = process.env.MONGO_URI

const PersonSchema = new Schema({
    name: String,
    number:String
})
PersonSchema.set("toJSON",{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then(result => {
    console.log("Connected to Mongo DB")
})
.catch(err =>{
    console.log("Error connecting to Mongo DB ", err.message)
})
module.exports = model('Person', PersonSchema)

