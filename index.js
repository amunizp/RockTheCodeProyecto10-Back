require('dotenv').config()
const commentsRouter = require('./src/api/routes/comment')
const peopleRouter = require('./src/api/routes/person')
const connectMongo = require('./src/config/connectMongo')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors()) //conectar al front
connectMongo()
app.use('/api/v1/comments', commentsRouter)
app.use('/api/v1/people', peopleRouter)

app.use('*', (rew, res, next) => {
  return res.status(404).json('Route not found')
})
port = 3000
app.listen(port, () => {
  console.log(`Server connected in http://localhost:${port} 😅  `)
})
