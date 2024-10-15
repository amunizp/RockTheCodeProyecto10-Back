const {
  getPeople,
  getPersonById,
  register,
  updatePerson,
  login
} = require('../controllers/person')
const { isAuth } = require('../middlewares/auth')

const peopleRouter = require('express').Router()

peopleRouter.get('/', getPeople)
peopleRouter.get('/:id', getPersonById)
peopleRouter.post('/register', register)
peopleRouter.post('/login', login)
peopleRouter.put('/:id', isAuth, updatePerson)

module.exports = peopleRouter
