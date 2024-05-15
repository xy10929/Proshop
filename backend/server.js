//entry poiont of backend

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

const port = process.env.PORT || 5000

//connect to DB by mongoose
connectDB()

const app = express()

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API is running...')
})

//set routes prifix and the file they will call which includes the actual methods
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

//paypal route
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

//error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
