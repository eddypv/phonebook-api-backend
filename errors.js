const errorHandler = (error, request ,response, next)=>{
    console.log(error.message)
    if(error.name === "CastError"){
        return response.status(400).json({error:"malformatted id"})
    }
    next(error)
}
const notFoundHandler = (request, response) =>{
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    errorHandler,
    notFoundHandler
}