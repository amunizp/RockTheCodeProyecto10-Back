const { default: mongoose } = require('mongoose')

const pointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'point'
  }
)

const courtSchema = new mongoose.Schema(
  {
    name: String,
    location: {
      type: pointSchema,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'courtPoints'
  }
)

const courtLocation = mongoose.model('courtPoints', courtSchema, 'courtPoints')

module.exports = courtLocation
