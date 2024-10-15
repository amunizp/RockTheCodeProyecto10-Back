const Person = require('../models/person')
const { verifyKey } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.split(' ').pop().trim()

    const { id } = verifyKey(parsedToken)
    const person = await Person.findById(id)

    person.password = null
    req.person = person
    next()
  } catch (error) {
    return res.status(400).json('You are not authorised')
  }
}

module.exports = { isAuth }
