require('dotenv').config()

const connectMongo = require('./src/config/connectMongo')
const express = require('express')
const cors = require('cors')

const mainRouter = require('./src/api/routes/mainRouter')
const cloudinary = require('cloudinary').v2

const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const allowedOrigins = [
  'http://localhost:5173', // Your local development URL
  'https://rock-the-code-proyecto10-front.vercel.app' // Your deployed frontend URL
]
const deployed = true
const theOrigin = deployed ? allowedOrigins[1] : allowedOrigins[0]

console.log(`Are we are deployed? ${deployed} if so the origin is ${theOrigin}`)
app.use(
  cors({
    origin: theOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  })
) //conectar al front

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', mainRouter)
connectMongo()

app.use('*', (rew, res, next) => {
  return res.status(404).json('Route not found')
})
port = 3000
app.listen(port, () => {
  console.log(`Server connected in http://localhost:${port} 😅  `)
})
