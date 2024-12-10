const {
  getPeople,
  getPersonById,
  register,
  updatePerson,
  login
} = require('../controllers/person')
const { isAuth, isAdmin } = require('../middlewares/auth')

const peopleRouter = require('express').Router()

peopleRouter.get('/', [isAuth], getPeople)
peopleRouter.get('/:id', [isAuth], getPersonById)
peopleRouter.post('/register', register)
peopleRouter.post('/login', login)
peopleRouter.put('/:id', [isAdmin], updatePerson)

module.exports = peopleRouter
