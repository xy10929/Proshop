//will be called if no other middleware has handled the req
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

//override default express errorHandler
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  //the message that Error throwed
  let message = err.message

  //check for mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Resourse not found`
    statusCode = 404
  }

  res.status(statusCode).json({
    message,
    //for developer
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
