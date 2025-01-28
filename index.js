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

console.log(`we are deployed ${deployed} so the origin is ${theOrigin}`)
app.use(
  cors({
    // origin: theOrigin,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  })
) //conectar al front
//https://dev.to/saqib_abbas_8d1b9da205a09/fixing-the-cors-policy-no-access-control-allow-origin-error-in-web-development-36e4
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', [
    'http://localhost:5173',
    'https://rock-the-code-proyecto10-front.vercel.app'
  ])
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

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
