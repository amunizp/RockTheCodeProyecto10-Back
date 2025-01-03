const Person = require('../api/models/person')
const { verifyKey } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log('the authorisation as it comes from the header', token)
    const parsedToken = token.split(' ').pop().trim()
    console.log(parsedToken)

    const { id } = verifyKey(parsedToken)
    const person = await Person.findById(id)

    person.password = null
    req.person = person
    next()
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'You are not authorised', error: error.message })
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.split(' ').pop().trim()

    const { id } = verifyKey(parsedToken)
    const person = await Person.findById(id)

    person.password = null
    req.person = person
    if (person.admin) {
      next()
    } else {
      console.log(`Person is admin? ${person.admin}`)
      throw new Error('You are not admin')
    }
  } catch (error) {
    return res.status(400).json('Seems you are not authorised')
  }
}

module.exports = { isAuth, isAdmin }
