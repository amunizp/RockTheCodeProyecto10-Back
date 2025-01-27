const Person = require('../models/person')
const bcrypt = require('bcrypt')
const { generateKey } = require('../../config/jwt')

const getPeople = async (req, res, next) => {
  try {
    const people = await Person.find()
    return res.status(200).json(people)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error getting all people', error: error.message })
  }
}

const getPersonById = async (req, res, next) => {
  try {
    const { id } = req.params
    const person = await Person.findById(id).populate('comments')
    return res.status(200).json(person)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error getting person by id', error: error.message })
  }
}

const register = async (req, res, next) => {
  try {
    const personDuplicated = await Person.findOne({
      personName: req.body.personName
    })

    if (personDuplicated) {
      return res
        .status(400)
        .json({ message: 'Person already exists, try a different name.' })
    }

    const newPerson = new Person({
      personName: req.body.personName,
      password: req.body.password,
      admin: false
    })
    const person = await newPerson.save()
    return res.status(201).json(person)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'error registering a new person', error: error.message })
  }
}

const login = async (req, res, next) => {
  try {
    const { personName, password } = req.body

    const person = await Person.findOne({ personName })

    if (!person) {
      return res.status(400).json({ message: 'User or Password not found.' })
    }

    if (bcrypt.compareSync(password, person.password)) {
      console.log('going to generate a Key')
      const token = generateKey(person._id)
      return res.status(200).json({ token, person })
    }

    return res.status(400).json({ message: 'User or Password not found.' })
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'Error while attempting to log in',
        error: error.message
      })
  }
}

const updatePerson = async (req, res, next) => {
  try {
    const { id } = req.params

    if (req.person._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: 'You can only modify your own person.' })
    }

    const oldPerson = await Person.findById(id)
    const newPerson = new Person(req.body)
    newPerson._id = id
    newPerson.comments = [...oldPerson.comments, ...newPerson.comments]
    const personUpdated = await Person.findByIdAndUpdate(id, newPerson, {
      new: true
    })

    return res.status(200).json(personUpdated)
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'error while updating a person´s details',
        error: error.message
      })
  }
}

module.exports = {
  getPeople,
  getPersonById,
  register,
  updatePerson,
  login
}
