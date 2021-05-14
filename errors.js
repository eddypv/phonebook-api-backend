const errorHandler = (error, request ,response, next) => {
  console.error(error.name)
  if(error.name === 'CastError'){
    return response.status(400).json({ error:'malformatted id' })
  } else if( error.name === 'ValidationError'){
    let messageError = 'Error'
    if (typeof error.errors.name !== 'undefined'){
      messageError =`${error._message}:${error.errors['name'].message}`
    }else if (typeof error.errors.number !== 'undefined'){
      messageError =`${error._message}:${error.errors['number'].message}`
    }
    return response.status(400).json({ error:messageError })
  }
  next(error)
}
const notFoundHandler = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  notFoundHandler
}