//entry poiont of backend

import path from 'path'
import express from 'express'

//for using .env variables
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const port = process.env.PORT || 5000

//connect to DB by mongoose
connectDB()

const app = express()

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cookie parser middleware
app.use(cookieParser())

//set routes prifix and the file they will call which includes the actual methods
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//set  __dirname to current directory
const __dirname = path.resolve()
//set upload folder as static folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//paypal route, return client id
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

if (process.env.NODE_ENV === 'production') {
  //set static folder in react build folder
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  //any route that is not api will be redirected to index.html
  app.get('*', (req, res) =>
    //load index.html in '/frontend/build'(build folder)
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

//error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
