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
deployed ? (theOrigin = allowedOrigins[1]) : (theOrigin = allowedOrigins[0])
// const theOrigin = function (origin, callback) {
//   // Allow requests with no origin (like mobile apps or curl requests)
//   if (!origin) return callback(null, true)
//   if (allowedOrigins.indexOf(origin) === -1) {
//     const msg =
//       'The CORS policy for this site does not allow access from the specified Origin.'
//     return callback(new Error(msg), false)
//   }
//   return callback(null, true)
// }
app.use(express.json())
console.log(`we are delployed ${deployed} so the origin is ${theOrigin}`)
app.use(
  cors({
    origin: theOrigin, //'http://localhost:5173', // theOrigin(), //Replace with your frontend's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  })
) //conectar al front

connectMongo()

app.use('/api/v1/', mainRouter)

app.use('*', (rew, res, next) => {
  return res.status(404).json('Route not found')
})
port = 3000
app.listen(port, () => {
  console.log(`Server connected in http://localhost:${port} 😅  `)
})
