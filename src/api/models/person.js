const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema(
  {
    personName: { type: String, required: true },
    password: { type: String, required: true },
    admin: {
      type: Boolean,
      required: true,
      default: false
    },
    comments: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'comments' }
    ]
  },
  {
    timestamps: true,
    collection: 'people'
  }
)

personSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const Person = mongoose.model('people', personSchema, 'people')
module.exports = Person
