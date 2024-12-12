const commentsRouter = require('./comment')
const peopleRouter = require('./person')

const mainRouter = require('express').Router()

mainRouter.use('/comments', commentsRouter)
mainRouter.use('/people', peopleRouter)

module.exports = mainRouter
