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

app.use(express.json())
app.use(cors()) //conectar al front

connectMongo()

app.use('/api/v1/', mainRouter)

app.use('*', (rew, res, next) => {
  return res.status(404).json('Route not found')
})
port = 3000
app.listen(port, () => {
  console.log(`Server connected in http://localhost:${port} 😅  `)
})
